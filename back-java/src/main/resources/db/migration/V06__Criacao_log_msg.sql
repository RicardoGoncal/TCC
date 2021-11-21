CREATE table log_torre
(
    id bigint primary key auto_increment,
    id_uav varchar(255) not null,
    user varchar(255) not null,
    mensagem varchar(255) not null,
    data_envio timestamp not null
);

