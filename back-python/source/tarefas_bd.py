# -*- coding: utf-8 -*-

from configparser import ConfigParser
import mysql.connector

"""
    Código com o objetivo de trabalhar com o banco de dados
"""
class Tarefas_Bd():

    """
        Classe com o objetivo de executar comandos SQL
    """

    def __init__(self):

        self.config = ConfigParser()
        self.path = '../source/sql.ini'
        self.config.read(self.path)

        self.mydb = mysql.connector.connect(
            host = self.config.get('main', 'host'),
            user = self.config.get('main', 'user'),
            password = self.config.get('main', 'password'),
            database = self.config.get('main', 'database')
        )

    def inserir_log_torre(self, id_uav,msg_uav,data):

        """
            Método destinado a gravar informação de envio da Torre de Controle
            params: identificação do uav, mensagem vinda front, data de envio
        """
        mycursor = self.mydb.cursor()
        query = "insert into log_torre (id_uav, mensagem, data_envio) values('{}','{}','{}')".format(id_uav,msg_uav,data)
        mycursor.execute(query)

        self.mydb.commit()
        self.mydb.close()