#!/usr/bin/env python

"""
    Código responsável por realizar alguma modificação na mensagem enviada ao UAV,
    simulando uma pequena invasão causando uma falha.
"""

import random

class Modulo_Falha(object):

    """
        Classe Modulo_Falha, responsável por causar interferencias nas mensagens envidas aos UAVs
    """

    def __init__(self, argumento, message):

        self.argumento = str(argumento)
        self.message = str(message)

    def altera_msg(self):
        falha = 'falha_' + self.argumento
        metodo = getattr(self, falha, lambda:"Opção Invalida")
        return metodo()


    def falha_1(self, msg=''):

        """
            Método do modulo de falha que faz com que a mensagem toda fique em minuscula
        """

        if msg != '':
            return msg.lower()
        else:
            mensagem = self.message
            lista_msg = mensagem.split(";")

            if len(lista_msg) == 1:
                return mensagem.lower()
            else:
                indice_aleatorio = random.randrange(0,len(lista_msg),1)
                msg_aleatoria = lista_msg[indice_aleatorio]
                lista_msg.pop(indice_aleatorio)
                msg_aleatoria = msg_aleatoria.lower()
                lista_msg.insert(indice_aleatorio, msg_aleatoria)

                return ';'.join(lista_msg)

    def falha_2(self):

        """
            Método do modulo de falha que modifica a escala se caso a mensagem for uma que contém
            Em caso de não conter escala, apenas passa pelo processo de ficar minuscula
        """

        lista_adm = ('DATALINK', 'DOWNLINK', 'MINIMUM', 'PRESENT')

        mensagem = self.message
        lista_msg = mensagem.split(";")
        indice_aleatorio = random.randrange(0,len(lista_msg),1)
        msg_aleatoria = lista_msg[indice_aleatorio]
        lista_msg.pop(indice_aleatorio)

        if msg_aleatoria.split(" ")[0] in lista_adm:
            alteracao = self.falha_1(msg_aleatoria)
            lista_msg.insert(indice_aleatorio, alteracao)

            return ';'.join(lista_msg)

        else:
            alteracao = self.altera_escala(msg_aleatoria)
            lista_msg.insert(indice_aleatorio, alteracao)

            return ";".join(lista_msg)
    
    
    def altera_escala(self, msg):

        mensagem = msg
        
        quebra_msg = mensagem.split(" ")
        escala = quebra_msg[-1]
        quebra_msg.pop()
       
        if 'FL' in escala:
            escala = escala[2:]

            if int(escala) >= 10 and int(escala) <= 120:
                
                escala_falha = random.ranrange(120,200,10)
                return ' '.join(quebra_msg) + ' ' + str(escala_falha)
        else:
            if int(escala) >= 10 and int(escala) <= 120:

                escala_falha = random.randrange(120,200,10)
                return ' '.join(quebra_msg) + ' ' + str(escala_falha)
            