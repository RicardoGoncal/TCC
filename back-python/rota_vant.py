# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from tarefas_bd import Tarefas_Bd
import datetime

# Configuração da API
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Area das funções
def log_torre(id_vant, msg_vant):
    """
        Realizar a inserção de dados na tabela de log da Torre 
        de comando
    """
    log_torre = Tarefas_Bd()
    data = datetime.datetime.now()

    log_torre.inserir_log_torre(id_vant=id_vant, msg_vant=msg_vant, data=data)

@app.route('/vant', methods=['POST','GET'])
def vant():

    """
        Rota para receber as msg da torre de comando
    """

    if request.json is None:
        return jsonify({"mensagem":"ERRO: Mensagem invalida ou nula"})
    else:
        content = {}
        content.update(request.json)
        print(content)

        # Inserir na tabela de log no BD
        log_torre(id_vant=content['vant'], msg_vant=content['message'])

        # coelho

        return jsonify(content)
