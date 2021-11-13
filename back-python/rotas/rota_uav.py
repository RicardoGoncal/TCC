# -*- coding: utf-8 -*-

import random
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from source.tarefas_bd import Tarefas_Bd
from source.envio_rabbit import Envio_Rb
from source.modulo_falha import Modulo_Falha
import datetime

# Configuração da API
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Área das funções
# def log_torre(id_uav, msg_uav):
#     """
#         Realiza a inserção de dados na tabela de log da Torre 
#         de controle
#     """
#     log_torre = Tarefas_Bd()
#     data = datetime.datetime.now()

#     log_torre.inserir_log_torre(id_uav=id_uav, msg_uav=msg_uav, data=data)


@app.route("/health")
def hello():
    return "Server Envio Health OK"


@app.route('/uav', methods=['POST','GET'])
def uav():

    """
        Rota que recebe um POST contendo uma mensagem da torre de controle
        Params: request Json contendo ID do UAV, mensagem e número do port
        Return: retorna o conteúdo da request pedida ao uav 
    """

    if request.json is None:
        return jsonify({"mensagem":"ERRO: Mensagem invalida ou nula"})
    else:
        content = {}
        content.update(request.json)
        print(content)
        print(content['message'])
        
        """
            Antes de mandar enviar, verificar flag do modulo de falhas. Caso entre na flag invocar a classe e mudar
            a mensagem antes de enviar
        """

        # Inserir na tabela de log da torre de comando no banco de dados
        # log_torre(id_uav=content['uav'], msg_uav=content['message'])

        # Cria instância para envio de mensagem ao uav
        torre_rb = Envio_Rb(id_uav=content['uav'], port_uav=content['port'], message=content['message'])

        print(" [x] Requesting...")  # Aguardando a resposta do request pedido ao uav
        response = torre_rb.call()  # Recebe a resposta
        print(" [.] Got %r" % response) # Print da resposta

        return jsonify(content) # Retorna 


@app.route('/fail', methods=['POST'])
def falha():
    """
        Rota que recebe um POST contendo uma mensagem da torre de controle
        Params: request Json contendo ID do UAV, mensagem e número do port
        Return: retorna o conteúdo da request pedida ao uav 
    """

    if request.json is None:
        return jsonify({"mensagem":"ERRO: Mensagem invalida ou nula"})
    else:
        content = {}
        content.update(request.json)
        print(content)
        print(content['message'])
        
        """
            Antes de mandar enviar, verificar flag do modulo de falhas. Caso entre na flag invocar a classe e mudar
            a mensagem antes de enviar
        """

        # Invocar o modulo de falha
        falha = Modulo_Falha(random.randrange(1,3,1), content['message'])
        mensagem_do_mal = falha.altera_msg()

        # Inserir na tabela de log da torre de comando no banco de dados
        # log_torre(id_uav=content['uav'], msg_uav=content['message'])

        # Cria instância para envio de mensagem ao uav
        torre_rb = Envio_Rb(id_uav=content['uav'], port_uav=content['port'], message=mensagem_do_mal)

        print(" [x] Requesting...")  # Aguardando a resposta do request pedido ao uav
        response = torre_rb.call()  # Recebe a resposta
        print(" [.] Got %r" % response) # Print da resposta

        return jsonify(content) # Retorna 


if __name__=="__main__":
    app.run(port=5000, host='localhost')