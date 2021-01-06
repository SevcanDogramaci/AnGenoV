
from flask import Flask
app = Flask(__name__)


@app.route('/world')
def hello_world():
    return 'Hello World :)!'

@app.route('/another_world')
def hello_another_world():
    return 'Hello Another World :)!'

@app.route('/get_variants')
def get_variants():
    return 'Variants returned !'