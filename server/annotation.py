import myvariant, requests, sys, json
import variant_reader

# # find hgvs for each variant and annotate with Ensembl VEP
def post_to_vep(hgvs_data):
    server = "https://rest.ensembl.org"
    ext = "/vep/human/hgvs"
    headers={ "Content-Type" : "application/json", "Accept" : "application/json"}

    request_data = json.dumps({
        "hgvs_notations": hgvs_data
    })

    r = requests.post(server+ext, headers=headers, data=request_data)
    if not r.ok:
        r.raise_for_status()
        sys.exit()

    decoded = r.json()
    return json.dumps(decoded, indent=4, sort_keys=True)


# # annotate variant with eUtils
def annotate_variants_by_id(vcf_file_name, ids):

    mv = myvariant.MyVariantInfo()

    variants = variant_reader.filter_variants_by_id(vcf_file_name, ids)
    all_annotation_results = []
    annotation_dbs = ["clinvar", "snp", "dbvar"]

    for id, variant in enumerate(variants):
        variant_hgvs = mv.format_hgvs(variant["chrom"], variant["pos"], variant["ref"], variant["alts"][0])
        annotation_results = []

        ensemble_annotations =  post_to_vep([variant_hgvs])

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