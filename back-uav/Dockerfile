FROM python:3.8-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . . 

COPY sistema_embarcado.py server_uav.py /app/

ENV FLASK_APP=server_uav.py

ENV PYTHONPATH=./

CMD ["python", "-u","server_uav.py"]
