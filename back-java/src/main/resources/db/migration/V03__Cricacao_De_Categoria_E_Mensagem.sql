CREATE TABLE categoria
(
    id bigint PRIMARY KEY auto_increment,
    nome varchar(200)
);

CREATE table mensagem
(
    id bigint primary key auto_increment,
    id_categoria bigint,
    mensagem varchar(200),
    FOREIGN KEY (id_categoria) references categoria (id)
);