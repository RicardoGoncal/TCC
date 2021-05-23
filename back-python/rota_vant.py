# -*- coding: utf-8 -*-

from flask import Flask
from flask import request

# nome da api
app = Flask(__name__)

@app.route('/vant/<string:msg1>&<string:msg2>&<string:msg3>&<string:msg4>&<string:msg5>', methods=['POST','GET'])
def vant(msg1, msg2, msg3, msg4, msg5):

    """
        Rota para receber as msg da torre de comando
    """
    msg1 = msg1
    msg2 = msg2
    msg3 = msg3
    msg4 = msg4
    msg5 = msg5

    return '<h1>{}</h1><br><h1>{}</h1><br><h1>{}</h1>'.format(msg1,msg2,msg3)


