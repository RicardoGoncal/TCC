INSERT INTO torre_comando (nome, senha, authorities ) VALUES ('Admin', '{bcrypt}$2a$10$5l7VBtTLjOYFjUCOnGCH5uny81vZWiD4DHAqdvIawT7jYjUt2bYBK', 'ROLE_USER,ROLE_ADMIN');
INSERT INTO torre_comando (nome, senha, authorities ) VALUES ('User', '{bcrypt}$2a$10$ggZCLzTRQ8zAKslJkIpELeVtq4LXAk3z6sl0BoLS9yExyD1.bTFIO', 'ROLE_USER');

INSERT into vant
(nome)
values ('vant_001'),
       ('vant_002'),
       ('vant_003'),
       ('vant_004'),
       ('vant_005'),
       ('vant_006'),
       ('vant_007'),
       ('vant_008'),
       ('vant_009'),
       ('vant_010');

insert into categoria
(nome)
values ('climb'),
       ('route'),
       ('descend'),
       ('comms'),
       ('speed'),
       ('report'),
       ('emerg'),
       ('crossing');