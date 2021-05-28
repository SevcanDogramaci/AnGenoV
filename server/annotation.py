import myvariant, requests, sys, json, re
import variant_reader

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
    return json.dumps(decoded, indent=4, sort_keys=True)

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
    svtype = variant["svtype"]

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



# # annotate variant with eUtils
def annotate_variants_by_id(vcf_file_name, ids):

    mv = myvariant.MyVariantInfo()

    variants = variant_reader.filter_variants_by_id(vcf_file_name, ids)
    all_annotation_results = []
    annotation_dbs = ["clinvar", "snp", "dbvar"]

    for id, variant in enumerate(variants):
        print("variant", variant)
        #variant_hgvs = mv.format_hgvs(variant["chrom"], variant["pos"], variant["ref"], alt)
        variant_hgvs = format_hgvs(variant)
        annotation_results = []
        print(variant_hgvs)

        try:
            ensemble_annotations =  post_to_vep([variant_hgvs])
        except:
            print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
            ensemble_annotations=''

        if ensemble_annotations != '':
            annotation_results.append(ensemble_annotations)
            
        for annotation_db in annotation_dbs:
            
            eSearch = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db={annotation_db}&term="
            eSummary = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db={annotation_db}&id="
            optionalParams = "&retmode=json"
            

            print(variant_hgvs)

            r = requests.post(eSearch + variant_hgvs + optionalParams)

            if not r.ok:
                r.raise_for_status()
                sys.exit()

            decoded = r.json()
            foundUIDs = decoded["esearchresult"]["idlist"]

            if(len(decoded["esearchresult"]["idlist"]) > 0):
                print(">>", foundUIDs)

                for UID in foundUIDs:
                    print(eSummary + UID + optionalParams)
                    fetch_r = requests.post(eSummary + UID + optionalParams)

                    if not fetch_r.ok:
                        fetch_r.raise_for_status()
                        sys.exit()

                    annotation_result = json.dumps(fetch_r.json(), indent=4, sort_keys=True)
                    annotation_results.append(annotation_result)
                    print(annotation_result)
                    print()
            else:
                print(">> No UIDs")
                print()

        all_annotation_results.append({"id": ids[id], "annotations": annotation_results})

    print(all_annotation_results)
    return all_annotation_results