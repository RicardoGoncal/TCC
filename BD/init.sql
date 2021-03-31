# Para realizar o uso do database do trabalho
use cpdlc;

# Scripts para a criação da base de dados do Trabalho de Graduação


# Criação da tabela de Torre de Comando, a qual seria o usuário que enviará a mensagem ao Vant
CREATE table torre_comando(
	id_torre integer primary key auto_increment,
	nome_da_torre varchar(200),
	password varchar(200)
);

# Criação da tabela de Vants
CREATE table vants(
	id_vant integer primary key auto_increment,
	nome_vant varchar(200)
);


# Criação da tabela de comunicação, onde teremos separação por categoria de acordo com o que o
# a aeronave vai executar
CREATE table comandos(
	id_comando integer primary key auto_increment,
	categoria_comando varchar(200),
	nome_comando varchar(200)
);
