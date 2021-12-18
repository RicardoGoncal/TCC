CREATE table uav
(
    id bigint primary key auto_increment,
    nome varchar(200) not null,
    port integer not null UNIQUE
);