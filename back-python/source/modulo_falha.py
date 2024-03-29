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
            print('unica msg sofrendo alteracao')
            msg = msg.lower()

            print('sofrida alteracao: ' + msg)

            return msg
        else:
            mensagem = self.message
            lista_msg = mensagem.split(";")
            lista_msg.pop()

            print('lista do caraio')
            print(lista_msg)

            if len(lista_msg) == 1:
                print("FALHA DE UMA UNICA")
                return mensagem.lower()
            else:
                indice_aleatorio = random.randrange(0,len(lista_msg),1)
                msg_aleatoria = lista_msg[indice_aleatorio]
                lista_msg.pop(indice_aleatorio)
                msg_aleatoria = msg_aleatoria.lower()
                lista_msg.insert(indice_aleatorio, msg_aleatoria)

                junta_lista = ';'.join(lista_msg)

                return junta_lista + ';'

    def falha_2(self):

        """
            Método do modulo de falha que modifica a escala se caso a mensagem for uma que contém
            Em caso de não conter escala, apenas passa pelo processo de ficar minuscula
        """

        lista_adm = ('DATALINK', 'DOWNLINK', 'MINIMUM', 'PRESENT')


        mensagem = self.message
        lista_msg = mensagem.split(";")
        lista_msg.pop()

        print('entrou na falha 2')
        print(lista_msg)

        if len(lista_msg) == 1:

            unica_msg = lista_msg[0]

            if unica_msg.split(" ")[0] in lista_adm:

                print('unica mensagem indo para falha 1 ')
                alteracao = self.falha_1(unica_msg)
                lista_msg.pop()
                lista_msg.append(alteracao)

                junta_lista = ';'.join(lista_msg)

                return junta_lista + ';'

            else:
                alteracao = self.altera_escala(unica_msg)
                lista_msg.pop()
                lista_msg.append(alteracao)

                junta_lista = ';'.join(lista_msg)
        
                return junta_lista + ';'
        else:
            indice_aleatorio = random.randrange(0,len(lista_msg),1)
            msg_aleatoria = lista_msg[indice_aleatorio]
            lista_msg.pop(indice_aleatorio)

            if msg_aleatoria.split(" ")[0] in lista_adm:

                alteracao = self.falha_1(msg_aleatoria)
                lista_msg.insert(indice_aleatorio, alteracao)
                junta_lista = ';'.join(lista_msg)


                return junta_lista + ';'

            else:
                alteracao = self.altera_escala(msg_aleatoria)
                lista_msg.insert(indice_aleatorio, alteracao)

                junta_lista = ';'.join(lista_msg)

                return junta_lista + ';'
    
    
    def altera_escala(self, msg):

        mensagem = msg
        
        quebra_msg = mensagem.split(" ")
        escala = quebra_msg[-1]
        quebra_msg.pop()
       
        if 'FL' in escala:

            print(escala)
            escala = escala[2:]

            if int(escala) >= 10 and int(escala) <= 120:
                
                escala_falha = random.randrange(130,200,10)
                print(escala_falha)
                return ' '.join(quebra_msg) + ' ' + str(escala_falha)
        else:

            if int(escala) >= 10 and int(escala) <= 120:

                escala_falha = random.randrange(130,200,10)

                print(escala_falha)
                return ' '.join(quebra_msg) + ' ' + str(escala_falha)
            