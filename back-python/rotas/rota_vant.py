# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from source.tarefas_bd import Tarefas_Bd
from source.envio_rabbit import Envio_Rb
import datetime

# Configuração da API
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Área das funções
def log_torre(id_vant, msg_vant):
    """
        Realiza a inserção de dados na tabela de log da Torre 
        de comando
    """
    log_torre = Tarefas_Bd()
    data = datetime.datetime.now()

    log_torre.inserir_log_torre(id_vant=id_vant, msg_vant=msg_vant, data=data)

@app.route('/vant', methods=['POST','GET'])
def vant():

    """
        Rota que recebe um POST contendo uma mensagem da torre de comando
        Params: request Json contendo ID do vant, mensagem e número do port
        Return: retorna o conteúdo da request pedida ao vant 
    """

    if request.json is None:
        return jsonify({"mensagem":"ERRO: Mensagem invalida ou nula"})
    else:
        content = {}
        content.update(request.json)
        print(content)

        # Inserir na tabela de log da torre de comando no banco de dados
        log_torre(id_vant=content['vant'], msg_vant=content['message'])

        # Cria instância para envio de mensagem ao vant
        torre_rb = Envio_Rb(id_vant=content['vant'], port_vant=content['port'], message=content['message'])

        print(" [x] Requesting...")  # Aguardando a resposta do request pedido ao vant
        response = torre_rb.call()  # Recebe a resposta
        print(" [.] Got %r" % response) # Print da resposta

        return jsonify(content) # Retorna 
