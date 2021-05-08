CREATE TABLE categoria
(
    id integer PRIMARY KEY auto_increment,
    nome varchar(200)
);

CREATE table mensagem
(
    id integer primary key auto_increment,
    id_categoria integer,
    mensagem varchar(200),
    FOREIGN KEY (id_categoria) references categoria (id)
);