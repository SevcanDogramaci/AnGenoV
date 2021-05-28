import pathlib
from pysam import VariantFile

current_dir = pathlib.Path(__file__).parent.absolute()

VARIANT_PER_PAGE= 50

def get_variants(vcf_file_name) :
    print(f"VCF file >> {vcf_file_name}")
    vcf_in = VariantFile(f"{vcf_file_name}")  
    vcf_out = {}
    variants = []
    counter=1;

    for id, rec in enumerate(vcf_in.fetch()):
        variant_info = {}
        if rec.filter.get("PASS"):
            variant_info["chrom"] = rec.chrom
            if rec.id != None:
                variant_info["id"] = rec.id
            else:
                variant_info["id"] = "ANG" + str(counter)
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
        counter += 1
    vcf_out["variants"] = variants[0:]
    
    return vcf_out

def get_variants_by_page(vcf_file_name, page_no) :

    print(f"VCF file >> {vcf_file_name}")
    vcf_out = get_variants(vcf_file_name)

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

RESERVED_WORDS = [
	{ "name": 'chrom', "pattern": 'chrom(<|>|<=|>=|==|!=)(".*"|[0-9]+)' }, # chrom must be a string
	{ "name": 'pos', "pattern": 'pos(<|>|<=|>=|==|!=)([0-9]+)' },
	{ "name": 'end', "pattern": 'end(<|>|<=|>=|==|!=)([0-9]+)' },
	{ "name": 'id', "pattern": 'id(==|!=)(".*")' },
	{ "name": 'svtype', "pattern": 'svtype(==|!=)(".*")' },
	{ "name": 'genotype', "pattern": 'genotype(==|!=)"(0|1)+"'},
]

def replace_chrom_filter(reservedWord, filter_condition):
    pattern = reservedWord["pattern"]

    import re
    res = re.findall(pattern, "".join(filter_condition.split(' ')))
    print("Res", res)

    try:
        res = res[0]
        value = int(res[1].replace('"', ''))
        return filter_condition.replace(reservedWord["name"], f'int(variant["{reservedWord["name"]}"])')
    except:
        return filter_condition.replace(reservedWord["name"], f'variant["{reservedWord["name"]}"]')


def filter_variants_by_eval(vcf_file_name, filter_condition):
    variants = get_variants(vcf_file_name)["variants"]

    for reservedWord in RESERVED_WORDS:
        if reservedWord["name"] == 'chrom':
            filter_condition = replace_chrom_filter(reservedWord, filter_condition)
        else:
            filter_condition = filter_condition.replace(reservedWord["name"], f'variant["{reservedWord["name"]}"]')
        print('After:', filter_condition)
    print('Last:', filter_condition)

    try:
        filtered_variants = list(filter(lambda variant: eval(filter_condition), variants))
        print(filtered_variants)
        return filtered_variants
    except ValueError:
        print("Invalid comparison between integer and string")
        return []

def filter_variants_by_page(vcf_file_name, filter_condition, page_no):

    filtered_variants = {}
    variants = filter_variants_by_eval(vcf_file_name, filter_condition)

    filtered_variants["variants"] = variants[0:]

    total_page_number = len(filtered_variants["variants"])//VARIANT_PER_PAGE + (len(filtered_variants["variants"])%VARIANT_PER_PAGE > 0) if 1 else 0
    page_start = page_no*VARIANT_PER_PAGE

    if (page_no*VARIANT_PER_PAGE) + VARIANT_PER_PAGE >= len(filtered_variants["variants"]):
        page_end = len(filtered_variants["variants"]) 
    else:
        page_end = page_no*VARIANT_PER_PAGE + VARIANT_PER_PAGE


    filtered_variants["variants"] = filtered_variants["variants"][page_start: page_end]
    filtered_variants["current_page_no"] = page_no
    filtered_variants["total_page_number"] = total_page_number

    print(filtered_variants)

    return filtered_variants


# filter_variants_by_page("/home/sevcan/Desktop/dbsnp/tutorials/Variation Services/test_vcf.vcf", "pos>10100", 0)
# filter_variants_by_page("/home/sevcan/Desktop/dbsnp/tutorials/Variation Services/test_vcf.vcf", 'chrom <    2', 0)
# filter_variants_by_page("/home/sevcan/Desktop/dbsnp/tutorials/Variation Services/test.vcf", 'chrom <    2', 0)
