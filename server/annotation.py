import myvariant, requests, sys, json, re
import variant_reader
from eUtil import e_search

# # find hgvs for each variant and annotate with Ensembl VEP
def post_to_vep(hgvs_data):
    server = "https://rest.ensembl.org"
    ext = "/vep/human/hgvs"
    headers={ "Content-Type" : "application/json", "Accept" : "application/json"}

    request_data = json.dumps({
        "hgvs_notations": hgvs_data
    })
    print("resuest_data=" , request_data)
    r = requests.post(server+ext, headers=headers, data=request_data)
    if not r.ok:
        r.raise_for_status()
        sys.exit()

    decoded = r.json()
    return decoded

# # find hgvs for each variant and annotate with Ensembl VEP
def get_from_vep(id):
     
    server = "https://rest.ensembl.org"
    ext = "/vep/human/id/"
    headers={ "Content-Type" : "application/json", "Accept" : "application/json"}
    
    print(server+ext+id)
    r = requests.get(server+ext+id, headers=headers)
    
    if not r.ok:
        r.raise_for_status()
        sys.exit()
    
    decoded = r.json()
    return decoded

def _normalized_vcf(variant): # get from myvariant source code and modificated
    """If both ref/alt are > 1 base, and there are overlapping from the left,
       we need to trim off the overlapping bases.
       In the case that ref/alt is like this:
           CTTTT/CT    # with >1 overlapping bases from the left
       ref/alt should be normalized as TTTT/T, more examples:
            TC/TG --> C/G
       and pos should be fixed as well.
    """
    alt = re.sub('[^ATGC]+' ,'', variant["alts"][0])
    ref = variant["ref"]
    pos = variant["pos"]
    _variant = variant.copy()
    for i in range(max(len(ref), len(alt))):
        _variant["ref"] = ref[i] if i < len(ref) else None
        _variant["alts"] = alt[i] if i < len(alt) else None
        if _variant["ref"] is None or _variant["alts"] is None or _variant["ref"] != _variant["alts"]:
            break

    # _ref/_alt cannot be both None, if so,
    # ref and alt are exactly the same,
    # something is wrong with this VCF record
    assert not (_variant["ref"] is None and _variant["alts"] is None)

    _variant["pos"] = int(pos)
    if _variant["ref"] is None or _variant["alts"] is None:
        # if either is None, del or ins types
        _variant["pos"] = _variant["pos"] + i - 1
        _variant["ref"] = ref[i-1:]
        _variant["alts"] = alt[i-1:]
    else:
        # both _ref/_alt are not None
        _variant["pos"] = _variant["pos"] + i
        _variant["ref"] = ref[i:]
        _variant["alts"] = alt[i:]

    return (_variant)

def format_hgvs(variant): # get from myvariant source code and modificated
    '''get a valid hgvs name from VCF-style "chrom, pos, ref, alt" data.

    Example:

        >>> myvariant.format_hgvs("1", 35366, "C", "T")
        >>> myvariant.format_hgvs("2", 17142, "G", "GA")
        >>> myvariant.format_hgvs("MT", 8270, "CACCCCCTCT", "C")
        >>> myvariant.format_hgvs("X", 107930849, "GGA", "C")

    '''
    chrom=variant["chrom"]
    alt = re.sub('[^ATGC]+' ,'', variant["alts"][0])
    ref = variant["ref"]
    pos = variant["pos"]
    end = variant["end"]
    try:
        svtype = variant["svtype"][0:3]
    except:
        svtype = "-"
    print("svtype", svtype)
    chrom = str(chrom)
    if chrom.lower().startswith('chr'):
        # trim off leading "chr" if any
        chrom = chrom[3:]
    if len(ref) == len(alt) == 1:
        # this is a SNP
        hgvs = 'chr{0}:g.{1}{2}>{3}'.format(chrom, pos, ref, alt)
    elif len(ref) > 1 and len(alt) == 1:
        # this is a deletion:
        if ref[0] == alt:
            start = int(pos) + 1
            end = int(pos) + len(ref) - 1
            if start == end:
                hgvs = 'chr{0}:g.{1}del'.format(chrom, start)
            else:
                hgvs = 'chr{0}:g.{1}_{2}del'.format(chrom, start, end)
        else:
            end = int(pos) + len(ref) - 1
            hgvs = 'chr{0}:g.{1}_{2}delins{3}'.format(chrom, pos, end, alt)
    elif len(ref) == 1 and len(alt) > 1:
        # this is an insertion
        if alt[0] == ref:
            hgvs = 'chr{0}:g.{1}_{2}ins'.format(chrom, pos, int(pos) + 1)
            ins_seq = alt[1:]
            hgvs += ins_seq
        else:
            hgvs = 'chr{0}:g.{1}delins{2}'.format(chrom, pos, alt)
    elif len(ref) > 1 and len(alt) > 1:
        if ref[0] == alt[0]:
            # if ref and alt overlap from the left, trim them first
            _variant = _normalized_vcf(variant)
            return format_hgvs(_variant)
        else:
            end = int(pos) + len(alt) - 1
            hgvs = 'chr{0}:g.{1}_{2}delins{3}'.format(chrom, pos, end, alt)
            
            #if alt is not sequence
    elif len(alt) == 0 and svtype == "DEL":
        start = int(pos)
        if len(ref) == 1:
            if start == end:
                hgvs = 'chr{0}:g.{1}del'.format(chrom, start)
            else:
                hgvs = 'chr{0}:g.{1}_{2}del'.format(chrom, start, end)

    else:
        raise ValueError("Cannot convert {} into HGVS id.".format((chrom, pos, ref, alt)))
    return hgvs

def annotate_snp(snp):
    
    print("SNP", snp)
    try:
        isDbSNPmember = snp["DB"]
    except KeyError:
        isDbSNPmember = False
    isRsidAvailable = snp["id"].startswith("rs")
    annotation_results = {}

    # if rsid available
    if isDbSNPmember and isRsidAvailable:

        # ensemble annotation with rsid
        try:
            ensemble_annotations =  get_from_vep(snp["id"])
        except:
            print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
            ensemble_annotations=''

        if ensemble_annotations != '':
            print("ENSEMBLE with RSID :")
            print(json.dumps(ensemble_annotations, indent=4, sort_keys=True))
            annotation_results["ENSEMBLE"] = ensemble_annotations

        dbSNPResults = e_search("snp", snp, snp["id"] + "[Reference SNP ID]")
        if len(dbSNPResults) > 0:
            annotation_results["dbSNP"] = dbSNPResults

        print("RESULTS:")
        print(annotation_results)
        all_annotation_results = {"id": snp["id"], "annotations": annotation_results}
    else:
        variant_hgvs = format_hgvs(snp)
        try:
            ensemble_annotations =  post_to_vep([variant_hgvs])
            print("HGVS: ", variant_hgvs)

            if ensemble_annotations != '':
                print("ENSEMBLE with HGVS :")
                print(json.dumps(ensemble_annotations, indent=4, sort_keys=True))
                annotation_results["ENSEMBLE"] = ensemble_annotations
        except:
            print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
            ensemble_annotations=''
        
        dbSNPResults = e_search("snp", snp, variant_hgvs)
        if len(dbSNPResults) > 0:
            annotation_results["dbSNP"] = dbSNPResults

        all_annotation_results = {"id": snp["id"], "annotations": annotation_results}

    print(all_annotation_results)
    return all_annotation_results


# # annotate variant with eUtils
def annotate_variant_by_id(vcf_file_name, id):

    variant = variant_reader.filter_variants_by_id(vcf_file_name, id)[0]

    try:
        print(variant)
        # annotate snp
        if variant["svtype"]:
            # annotate sv
            variant_hgvs = format_hgvs(variant)
            annotation_results = {}
            print("HGVS:", variant_hgvs)

            # ensemble
            try:
                ensemble_annotations =  post_to_vep([variant_hgvs])
            except:
                print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
                ensemble_annotations=''

            if ensemble_annotations != '':
                annotation_results["ENSEMBLE"] = ensemble_annotations
                print("ENSEMBLE RESULT:")
                print(ensemble_annotations)

            # dbvar
            query = f'{variant["chrom"]}[Chr] AND ({variant["pos"]}[ChrPos] OR {variant["end"]}[ChrEnd])' 
            dbVarResults = e_search("dbvar", variant, query)
            if len(dbVarResults) > 0:
                annotation_results["dbVar"] = dbVarResults
            
            all_annotation_results = {"id": variant["id"], "annotations": annotation_results}

        print(all_annotation_results)
        return all_annotation_results

    except KeyError:
        return annotate_snp(variant)
        

# # annotate multiple variants
def annotate_multiple_variants_by_id(vcf_file_name, ids):
    from collections import OrderedDict

    variants = variant_reader.filter_variants_by_id(vcf_file_name, ids)

    try:
        # annotate snps
        if variants[0]["svtype"]:
            # annotate svs
            all_annotation_results = []

            for id, variant in enumerate(variants):

                variant_hgvs = format_hgvs(variant)
                annotation_results = []
                print("HGVS:", variant_hgvs)

                # ensemble
                try:
                    ensemble_annotations =  post_to_vep([variant_hgvs])
                except:
                    print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
                    ensemble_annotations=''

                if ensemble_annotations != '':
                    print("ENSEMBLE RESULT:")
                    print(ensemble_annotations)
                    print(type(ensemble_annotations))
                    annotation_results.append(ensemble_annotations[0]["most_severe_consequence"])

                
                all_annotation_results.append(OrderedDict({"id": variant["id"], "most_severe_consequence": annotation_results}))
        print(all_annotation_results)
        return all_annotation_results

    except KeyError:
        
        all_annotation_results = []
        
        for id, snp in enumerate(variants):
            print("SNP", snp)

            isDbSNPmember = snp["DB"]
            isRsidAvailable = snp["id"].startswith("rs")
            annotation_results = []

            # if rsid available
            if isDbSNPmember and isRsidAvailable:

                # ensemble annotation with rsid
                try:
                    ensemble_annotations =  get_from_vep(snp["id"])
                except:
                    print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
                    ensemble_annotations=''

                if ensemble_annotations != '':
                    print("ENSEMBLE with RSID :")
                    print(json.dumps(ensemble_annotations, indent=4, sort_keys=True))
                    annotation_results.append(ensemble_annotations[0]["most_severe_consequence"])
        
                print("RESULTS:")
                print(annotation_results)
                all_annotation_results.append(OrderedDict({"id": snp["id"], "most_severe_consequence": annotation_results}))
            else:
                variant_hgvs = format_hgvs(snp)
                try:
                    ensemble_annotations =  post_to_vep([variant_hgvs])
                    print("HGVS: ", variant_hgvs)

                    if ensemble_annotations != '':
                        print("ENSEMBLE with HGVS :")
                        print(json.dumps(ensemble_annotations, indent=4, sort_keys=True))
                        annotation_results.append(ensemble_annotations[0]["most_severe_consequence"])
                except:
                    print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
                    ensemble_annotations=''

                all_annotation_results.append(OrderedDict({"id": snp["id"], "most_severe_consequence": annotation_results}))

        print(all_annotation_results)
        return all_annotation_results

# annotate_multiple_variants_by_id("/home/sevcan/Desktop/dbsnp/tutorials/Variation Services/test.vcf", None)