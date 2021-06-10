# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import mysql.connector
import datetime


# Realizar a inserção de dados na tabela de LOG
def inserir_log(id_vant, msg_vant):
    mydb = mysql.connector.connect(
        host = 'localhost',
        user = 'tcc',
        password = 'Seformar@21',
        database = 'cpdlc2'
    )

    data = datetime.datetime.now()

    mycursor = mydb.cursor()
    query = "insert into log_msg (id_vant, mensagem, data_envio) values('{}','{}','{}')".format(id_vant,msg_vant,data)
    mycursor.execute(query)

    mydb.commit()
    mydb.close()

# Criação da API 
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/vant', methods=['POST','GET'])
def vant():

    """
        Rota para receber as msg da torre de comando
    """

    if request.json is None:
        return jsonify({"mensagem":"ERRO: Mensagem invalida ou nula"})
    else:
        content = {"mensagem":"Mensagem recebida"}
        content.update(request.json)

        # Realizar a separação do json que virá do front
        #TODO trocar pelas infos corretas após atualização no envio do front
        id_vant = str('2')
        msg_vant = 'alter route to 890;report to pilot'

        # Inserir na tabela de log no BD
        inserir_log(id_vant=id_vant, msg_vant=msg_vant)

        # coelho

        print(content)
        return jsonify(content)
