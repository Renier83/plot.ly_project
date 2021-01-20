import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return # your-code-here

@app.route("/samples")
def samples():

    # open the json file, located at static/data/samples.json
    # use json.load() to read in the file as json
    # return that json through the Flask endpoini
    
    return # your-code-here

if __name__ == "__main__":
    app.run(debug=True)