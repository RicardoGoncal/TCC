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
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.18.0.1'))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=self.port)

    def numero_random(self):

        num = random.randint(0, 100)
        
        string = 'seu numero eh {}'.format(num)
        return string

    def on_request(self, ch, method, props, body):

        """
            Método atrelado a funcionalidades do RabbitMQ. Faz o retorno
            de uma mensagem após receber uma mensagem.
        """

        r = str(body)

        print(" [.] (%s)" % r)
        response = self.numero_random()

        ch.basic_publish(exchange='', routing_key=props.reply_to, properties = pika.BasicProperties(correlation_id= props.correlation_id), body=str(response))

        ch.basic_ack(delivery_tag=method.delivery_tag)

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
