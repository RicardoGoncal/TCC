#!/usr/bin/env python

import pika
import random
import sys

class Vant_Rb(object):

    def __init__(self, port):

        self.port = str(port)
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=self.port)

    def numero_random(self):

        num = random.randint(0, 100)
        
        string = 'seu numero eh {}'.format(num)
        return string

    def on_request(self, ch, method, props, body):

        r = str(body)

        print(" [.] (%s)" % r)
        response = self.numero_random()

        ch.basic_publish(exchange='', routing_key=props.reply_to, properties = pika.BasicProperties(correlation_id= props.correlation_id), body=str(response))

        ch.basic_ack(delivery_tag=method.delivery_tag)

    def consome_msg(self):

        self.channel.basic_qos(prefetch_count=1)

        self.channel.basic_consume(queue=self.port, on_message_callback=self.on_request)

        print("[x] Awaiting RPC requests")
        self.channel.start_consuming()

if __name__ == '__main__':

    port = sys.argv[1] if len(sys.argv) > 1 else 0
    vant_rb = Vant_Rb(port=port)
    vant_rb.consome_msg()
