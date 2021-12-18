#!/usr/bin/env python

import pika

"""
    Código responsável por fazer o envio de uma request(mensagem) para o uav.
"""

class Envio_Rb(object):

    """
        Classe Envio_Rb, responsável por pedir uma request a algum uav do server.
    """

    # Inicialização da classe
    def __init__(self, id_uav, port_uav, message):

        self.id = str(id_uav)
        self.port = str(port_uav)
        self.message = str(message)
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        self.channel = self.connection.channel()
        result = self.channel.queue_declare(queue='', exclusive=True)

        self.callback_queue = result.method.queue
        self.channel.basic_consume(queue=self.callback_queue, on_message_callback=self.on_response, auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self):
        """
            Método responsável por receber a resposta da request solicitada ao uav
        """
        self.response = None
        self.corr_id = str(self.id) 
        self.channel.basic_publish(exchange='', routing_key=self.port, properties=pika.BasicProperties(reply_to=self.callback_queue, correlation_id=self.corr_id),\
                                    body=self.message)

        while self.response is None:
            self.connection.process_data_events()
        return str(self.response)
