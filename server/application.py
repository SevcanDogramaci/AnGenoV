import variant_reader
import sv_calling
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/world')
def hello_world():
    return 'Hello World :)!'

@app.route('/another_world')
def hello_another_world():
    return 'Hello Another World :)!'

@app.route('/get_variants')
def get_variants():
    vcf_file_name = request.args.get('file')
    variants = variant_reader.get_variants(vcf_file_name)
    return variants

@app.route('/sv_calling')
def runDelly():
    sv_calling.runDelly()
    return "delly finished"