import myvariant, requests, sys, json, re
import variant_reader

def e_search(db, snp, query=""):
    results = []
    eSearch = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db={db}&term="
    eSummary = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db={db}&id="
    optionalParams = "&retmode=json"
    
    print(eSearch + query + optionalParams)
    r = requests.post(eSearch + query + optionalParams)

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

            annotation_result = fetch_r.json()
            print("ANNOTATION RESULT:", type(annotation_result))
            print(json.dumps(fetch_r.json(), indent=4, sort_keys=True))
            print()
            results.append(annotation_result["result"][str(UID)])

    else:
        print(">> No UIDs")
        print()
    return results




















""" def annotate_snps(snps):

    all_annotation_results = []
    
    for id, snp in enumerate(snps):
        print("SNP", snp)

        isDbSNPmember = snp["DB"]
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
                print(ensemble_annotations)
                annotation_results["ensemble"] = ensemble_annotations

            dbSNPResults = e_search("snp", snp, snp["id"] + "[Reference SNP ID]")
            if len(dbSNPResults) > 0:
                annotation_results["dbSNP"] = dbSNPResults
    
            all_annotation_results.append({"id": snp["id"], "annotations": annotation_results})
        else:
            variant_hgvs = format_hgvs(snp)
            try:
                ensemble_annotations =  post_to_vep([variant_hgvs])

                print("HGVS: ", variant_hgvs)

                if ensemble_annotations != '':
                    print("ENSEMBLE with HGVS :")
                    print(ensemble_annotations)
                    annotation_results["ensemble"] = ensemble_annotations
    
            except:
                print("Oops!" + str(sys.exc_info()[0]) + "occurred.")           
                ensemble_annotations=''
            
            dbSNPResults = e_search("snp", snp, variant_hgvs)
            if len(dbSNPResults) > 0:
                annotation_results["dbSNP"] = dbSNPResults

            all_annotation_results.append({"id": snp["id"], "annotations": annotation_results})

    print(all_annotation_results)

 """