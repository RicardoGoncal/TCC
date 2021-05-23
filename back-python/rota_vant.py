# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

# nome da api
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/vant', methods=['POST','GET'])
def vant():

    """
        Rota para receber as msg da torre de comando
    """
    content = request.json
    print(content)

    return jsonify(content)
