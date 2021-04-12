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
        variant_info["chrom"] = rec.chrom
        variant_info["pos"] = rec.pos
        variant_info["id"] = rec.id
        variant_info["ref"] = rec.ref
        variant_info["alts"] = rec.alts
        variants.append(variant_info)

    vcf_out["variants"] = variants[0:]
    
    return vcf_out

def filter_variants_by_id(vcf_file_name, ids):
    variants = get_variants(vcf_file_name)["variants"]
    filtered_variants = []

    for variant in variants:

        if variant["id"] in ids:
            filtered_variants.append(variant)

    print("Filtered variants >> ", filtered_variants)
    
    return filtered_variants

    


