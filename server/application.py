import variant_reader
import sv_calling
import merge

from flask import Flask, render_template, request, redirect, abort, flash, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/world')
def hello_world():
    return 'Hello World :)!'

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

@app.route('/sv_calling')
def runDelly():
    sample_file = request.args.get('sample_file')
    ref_file = request.args.get('ref_file')
    print("File names >> ", sample_file, ref_file)
    
    sv_calling.runDelly(ref_file, sample_file)
    return "delly finished"

@app.route('/merge')
def runSurvivor():
    file_name = request.args.get('file')
    merge.runSurvivor(file_name)

    return f"survıvor received {file_name} and finished"
