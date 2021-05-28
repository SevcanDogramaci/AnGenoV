
# third-party imports
from flask import Flask, render_template, request, redirect, abort, flash, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

# local application imports
from dto.message_response import *
import variant_reader
import sv_calling
import annotation
import merge

app = Flask(__name__)
CORS(app)

# @app.route("/trial")
# def trial():
#     from time import sleep
#     sleep(2)
#     return {
#                 "fileName": ["deneme.txt"],
#                 "message": ["sucessfull !"]
#         }

@app.route('/get_variants_by_page')
def get_variants_by_page():
    from collections import OrderedDict
    import json

    vcf_file_name = request.args.get('file')
    page_no = int(request.args.get('page_no'))
    variants = variant_reader.get_variants_by_page(vcf_file_name, page_no)

    return json.dumps(OrderedDict(variants))

@app.route('/upload_file', methods = ['POST'])
def upload_file():

    if 'file' not in request.files:
        return('No file part')

    file = request.files['file'] 
    print(secure_filename(file.filename))
    print(file.read())
    return 'Success'

@app.route('/get_variants')
def get_variants():
    vcf_file_name = request.args.get('file')
    variants = variant_reader.get_variants(vcf_file_name)
    return variants

@app.route('/filter')
def filter_variants_by_page():
    from collections import OrderedDict
    import json 

    vcf_file_name = request.args.get('file')
    filter_condition = request.args.get('filter')
    page_no = int(request.args.get('page_no'))

    variants = variant_reader.filter_variants_by_page(vcf_file_name, filter_condition, page_no)
    return json.dumps(OrderedDict(variants))

# @app.route('/filter')
# def filter_variants():
#     from collections import OrderedDict
#     import json 

#     vcf_file_name = request.args.get('file')
#     filter_condition = request.args.get('filter')
#     variants = variant_reader.filter_variants_by_eval(vcf_file_name, filter_condition)
#     return jsonify(variants)

@app.route('/annotate')
def annotate_variants():
    import json

    vcf_file_name = request.args.get('file')
    selected_variant_ids = request.args.get('ids')
    selected_variant_ids = json.loads(selected_variant_ids)
    print("Selected Variant Ids >> ", type(selected_variant_ids))

    annotated_variants = annotation.annotate_variants_by_id(vcf_file_name, selected_variant_ids)
    return jsonify(annotated_variants)

@app.route('/sv_calling/RST')
def runSelectedTools():
    import json

    sample_file = request.args.get('sample_file')
    ref_file = request.args.get('ref_file')
    selected_tools = request.args.get('selected_tools')
    print("File names >> ", sample_file, ref_file)
    print("Selected Tools >> ", selected_tools)

    selected_tools = json.loads(selected_tools)
    messages, files = sv_calling.runSelectedTools(ref_file, sample_file, selected_tools)
    
    response = MessageResponse(MessageType.SUCCESS, 
                                messages, 
                                files)
    print(response)

    return jsonify(response.get())

@app.route('/merge')
def runSurvivor():
    import json

    file_name = request.args.getlist('file')
    print("File_names >>", file_name, type(file_name))

    messages, files = merge.runSurvivor(file_name)
    response = MessageResponse(MessageType.SUCCESS, 
                                messages, 
                                files)
    print(response)
    return jsonify(response.get())
