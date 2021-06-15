#!/usr/bin/env python

import pika

class Torre_Rb(object):

    def __init__(self):

        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        result = self.channel.queue_declare(queue='', exclusive=True)

        self.callback_queue = result.method.queue
        self.channel.basic_consume(queue=self.callback_queue, on_message_callback=self.on_response, auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self):
        self.response = None
        self.corr_id = str(1)
        self.channel.basic_publish(exchange='', routing_key='vant2', properties=pika.BasicProperties(reply_to=self.callback_queue, correlation_id=self.corr_id),\
                                    body='me retorne um numero')

        while self.response is None:
            self.connection.process_data_events()
        return str(self.response)

