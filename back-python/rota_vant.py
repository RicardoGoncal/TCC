# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify

# nome da api
app = Flask(__name__)

@app.route('/vant', methods=['POST','GET'])
def vant():

    """
        Rota para receber as msg da torre de comando
    """
    content = request.json
    print(content)

    return jsonify(content)


