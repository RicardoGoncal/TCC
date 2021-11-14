# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from sistema_embarcado import uav_Rb
import datetime

"""
    Pequeno server criado com o framework Flask do Python.
    Nele teremos a inicialização dos uavs quando a rota for
    solicitada.
"""

# Configuração da API
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/health")
def health():
    return "Server UAV Health OK"

@app.route("/test", methods=['POST'])
def test():

    content = {}
    content.update(request.json)

    return content

# Área de criação das rotas do servidor
@app.route('/start', methods=['POST','GET'])
def uav():

    """
        Rota que recebe uma request para inicializar o uav
        Params: request Json contendo o número do port do uav
        return: o uav é inicializado para receber mensagens
    """

    content = {}
    content.update(request.json)
    print(content)



    uav_rb = uav_Rb(port=content['port'])
    uav_rb.consome_msg()
    
if __name__=="__main__":

    app.run(port=8085, host='0.0.0.0')