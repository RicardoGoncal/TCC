CREATE table log_retorno
(
    id bigint primary key auto_increment,
    id_uav varchar(255) not null,
    mensagem varchar(255) not null,
    aceito boolean not null,
    data_envio timestamp not null
);

