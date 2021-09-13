FROM python:3.8-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . . 

ENV FLASK_APP=rota_uav.py

COPY source/ .

ENV PYTHONPATH=./

CMD ["python", "./rotas/rota_uav.py", "--host=0.0.0.0"]

