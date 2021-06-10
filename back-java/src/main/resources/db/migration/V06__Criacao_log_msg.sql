CREATE table log_torre
(
    id integer primary key auto_increment,
    id_vant varchar(255) not null,
    mensagem varchar(255) not null,
    data_envio timestamp not null
)

