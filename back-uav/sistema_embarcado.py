#!/usr/bin/env python

import pika
import random
import sys

"""
    Código responsável por estabelecer um canal de conexão do uav
    no RabbitMQ
"""

class uav_Rb(object):

    """
        Classe uav, responsável por enviar uma resposta de uma request
        pedido da torre de comando
    """

    # Inicialização da classe
    def __init__(self, port):

        self.port = str(port)
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=self.port)

    def upper_msg(self, msg):
        """
            Metodo que analisa se a mensagem contém alguma letra em minuscula
            entrada: mensagem atual
            saida: verdadeiro ou falso de acordo com a logica
        """
    
        if msg.isupper():
            return True
        else:
            return False

    def msg_equal(self, msg_atual, msg_anterior):

        """
            Metodo que analisa se uma mensagem atual tem a mesma categoria da anterior
            entradas: mensagem atual e mensagem anterior
            saida: verdadeiro ou falso de acordo com a logica
        """

        if msg_atual.split(" ")[0] != msg_anterior.split(" ")[0]:
            return True
        else:
            return False

    def verifica_escala(self, msg):
        """
            Metodo que faz a analise da escala de voo do UAV. Limite max: 120m
            entrada: mensagem atual a ser analisada
            saida: verdadeiro ou falso de acordo com a logica
        """

        escala = msg.split(" ")[-1]

        if 'FL' in escala:
            escala = escala[2:]

            if int(escala) >= 10 and int(escala) <= 120:
                return True
            else:
                return False
        else:
            if int(escala) >= 10 and int(escala) <= 120:
                return True
            else:
                return False

    def on_request(self, ch, method, props, body):

        """
            Método atrelado a funcionalidades do RabbitMQ. Faz o retorno
            de uma mensagem após receber uma mensagem.

            OBS: Aqui vai pedir para realizar o tratamento da mensagem recebida, utilizando
            os modulos formados.
        """

        # Para contagem das mensagens
        contar_msg = 0

        # Verificar se o Body é a msg em si
        string_bytes = body

        # Decodifica a mensagem
        string_sbytes = str(string_bytes.decode('utf-8'))

        # Verifica se há mais de uma msg na string e faz contagem
        lista_msgs = string_sbytes.split(';')
        n_msgs = len(lista_msgs)

        # Variaveis para aceitação da msg
        response = ""
        aceita = False

        # Realiza o fluxo de analise da mensagem
        for index in range(len(lista_msgs)):

            print(lista_msgs[index])

            # Fluxo começando com analise de Upper
            if self.upper_msg(lista_msgs[index]):
                contar_msg += 1

                # Se for mais de uma mensagem
                if contar_msg > 1:

                    msg_anterior = lista_msgs[index - 1]
                    msg_atual = lista_msgs[index]

                    # Verifica se a mensagem anterior é da mesma categoria da atual
                    if self.msg_equal(msg_atual, msg_anterior):
                        print('Mensagem de categoria diferente, passe para a proxima etapa')

                        # Verifica se a mensagem está passando da escala max: 120m
                        if self.verifica_escala(msg_atual):
                            print("Mensagem dentro da escala, passe para a proxima etapa")
                            aceita = True
                        else:
                            print('Mensagem com escala não permitida, bloqueio do envio')
                            response = 'Mensagem com escala nao permitida, bloqueio do envio'
                            aceita = False
                            break
                    else:
                        print('Mensagem de mesma categoria da anterior, bloqueio do envio')
                        response = 'Mensagem de mesma categoria da anterior, bloqueio do envio'
                        aceita = False
                        break
                # Se for apenas uma mensagem
                else:
                    msg_atual = lista_msgs[index]

                    # Verifica se a mensagem está passando da escala max: 120m
                    if self.verifica_escala(msg_atual):
                         print("Mensagem dentro da escala, passe para a proxima etapa")
                         aceita = True
                    else:
                        print('Mensagem com escala não permitida, bloqueio do envio')
                        response = 'Mensagem com escala nao permitida, bloqueio do envio'
                        aceita = False
                        break
            else:
                print('Mensagem contém letra minuscula, bloqueio do envio')
                response = 'Mensagem contem letra minuscula, bloqueio do envio'
                aceita = False
                break
        
        if aceita:
            response = 'Mensagem passou em todos os teste. Aceito.'
            print(response)
            ch.basic_publish(exchange='', routing_key=props.reply_to, properties = pika.BasicProperties(correlation_id= props.correlation_id), body=str(response))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            ch.basic_publish(exchange='', routing_key=props.reply_to, properties = pika.BasicProperties(correlation_id= props.correlation_id), body=str(response))
            ch.basic_ack(delivery_tag=method.delivery_tag)


        executar_msg(sas):

            return 'ACCEPT' if sas else 'DENIED'
            
    def consome_msg(self):

        """
            Método atrelado a funcionalidades do RabbitMQ. Faz com que
            o canal criado na inicialização fique aguardando para consumir
            uma mensagem.
        """

        self.channel.basic_qos(prefetch_count=1)

        self.channel.basic_consume(queue=self.port, on_message_callback=self.on_request)

        print("[x] Awaiting RPC requests")
        self.channel.start_consuming()
