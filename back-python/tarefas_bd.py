# -*- coding: utf-8 -*-

from configparser import ConfigParser
import mysql.connector

class Tarefas_Bd():

    """
        Classe com o objetivo de executar comandos SQL
    """

    def __init__(self):

        self.config = ConfigParser()
        self.config.read('sql.ini')

        self.mydb = mysql.connector.connect(
            host = self.config.get('main', 'host'),
            user = self.config.get('main', 'user'),
            password = self.config.get('main', 'password'),
            database = self.config.get('main', 'database')
        )

    def inserir_log_torre(self, id_vant,msg_vant,data):

        """
            Método destinado a gravar informação de envio da Torre de Comando
            params: identificação do vant, mensagem vinda front, data de envio
        """
        mycursor = self.mydb.cursor()
        query = "insert into log_torre (id_vant, mensagem, data_envio) values('{}','{}','{}')".format(id_vant,msg_vant,data)
        mycursor.execute(query)

        self.mydb.commit()
        self.mydb.close()