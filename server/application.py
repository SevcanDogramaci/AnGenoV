
# third-party imports
from flask import Flask, render_template, request, redirect, abort, flash, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

# local application imports
from dto.message_response import *
import variant_reader
import sv_calling
import merge

app = Flask(__name__)
CORS(app)

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
    file_name = request.args.get('file')

    messages, files = merge.runSurvivor(file_name)
    response = MessageResponse(MessageType.SUCCESS, 
                                messages, 
                                files)
    print(response)
    return jsonify(response.get())