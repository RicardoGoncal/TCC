INSERT INTO torre_comando (nome, senha, authorities ) VALUES ('Admin', '{bcrypt}$2a$10$5l7VBtTLjOYFjUCOnGCH5uny81vZWiD4DHAqdvIawT7jYjUt2bYBK', 'ROLE_USER,ROLE_ADMIN');
INSERT INTO torre_comando (nome, senha, authorities ) VALUES ('User', '{bcrypt}$2a$10$ggZCLzTRQ8zAKslJkIpELeVtq4LXAk3z6sl0BoLS9yExyD1.bTFIO', 'ROLE_USER');

INSERT INTO vant (nome, port)
VALUES ('vant_001', 5001),
       ('vant_002', 5002),
       ('vant_003', 5003),
       ('vant_004', 5004),
       ('vant_005', 5005),
       ('vant_006', 5006),
       ('vant_007', 5007),
       ('vant_008', 5008),
       ('vant_009', 5009),
       ('vant_010', 5010);

INSERT INTO categoria
(nome)
VALUES ('climb'),
       ('route'),
       ('descend'),
       ('comms'),
       ('speed'),
       ('report'),
       ('emerg'),
       ('crossing');