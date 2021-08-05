# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from sistema_embarcado import Vant_Rb
import datetime

"""
    Pequeno server criado com o framework Flask do Python.
    Nele teremos a inicialização dos vants quando a rota for
    solicitada.
"""

# Configuração da API
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


# Área de criação das rotas do servidor
@app.route('/start', methods=['POST','GET'])
def vant():

    """
        Rota que recebe uma request para inicializar o vant
        Params: request Json contendo o número do port do vant
        return: o vant é inicializado para receber mensagens
    """

    content = {}
    content.update(request.json)
    print(content)

    vant_rb = Vant_Rb(port=content['port'])
    vant_rb.consome_msg()
    
