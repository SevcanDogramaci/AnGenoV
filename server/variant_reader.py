import pathlib
from pysam import VariantFile

current_dir = pathlib.Path(__file__).parent.absolute()

def get_variants(vcf_file_name) :

    print(f"VCF file >> {vcf_file_name}")
    vcf_in = VariantFile(f"{vcf_file_name}")  
    vcf_out = {}
    variants = []

    for id, rec in enumerate(vcf_in.fetch()):
        variant_info = {}
        if rec.filter.get("PASS"):
            variant_info["chrom"] = rec.chrom
            variant_info["pos"] = rec.pos
            variant_info["id"] = rec.id
            variant_info["ref"] = rec.ref
            variant_info["alts"] = rec.alts
            variant_info["end"] = rec.stop
            variants.append(variant_info)

    vcf_out["variants"] = variants[0:]
    
    return vcf_out

def get_variants_by_page(vcf_file_name, page_no) :

    VARIANT_PER_PAGE= 50

    print(f"VCF file >> {vcf_file_name}")
    vcf_in = VariantFile(f"{vcf_file_name}")  
    vcf_out = {}
    variants = []

    for id, rec in enumerate(vcf_in.fetch()):
        variant_info = {}
        if rec.filter.get("PASS"):
            variant_info["chrom"] = rec.chrom
            variant_info["id"] = rec.id
            variant_info["pos"] = rec.pos
            variant_info["end"] = rec.stop
            
            try:
                variant_info["svtype"] = rec.info['SVTYPE']
            except:
                pass
            try:
                variant_info["genotype"] = [s['GT'] for s in rec.samples.values()]
            except:
                pass
            variant_info["ref"] = rec.ref
            variant_info["alts"] = rec.alts

            variants.append(variant_info)

    vcf_out["variants"] = variants[0:]

    total_page_number = len(vcf_out["variants"])//VARIANT_PER_PAGE + (len(vcf_out["variants"])%VARIANT_PER_PAGE > 0) if 1 else 0
    page_start = page_no*VARIANT_PER_PAGE


    # page_end'e tekrar bak
    if (page_no*VARIANT_PER_PAGE) + VARIANT_PER_PAGE >= len(vcf_out["variants"]):
        page_end = len(vcf_out["variants"]) 
    else:
        page_end = page_no*VARIANT_PER_PAGE + VARIANT_PER_PAGE

    vcf_out["variants"] = vcf_out["variants"][page_start: page_end]
    vcf_out["current_page_no"] = page_no
    vcf_out["total_page_number"] = total_page_number

    return vcf_out

def filter_variants_by_id(vcf_file_name, ids):
    variants = get_variants(vcf_file_name)["variants"]
    filtered_variants = []

    for variant in variants:

        if variant["id"] in ids:
            filtered_variants.append(variant)

    print("Filtered variants >> ", filtered_variants)
    
    return filtered_variants

