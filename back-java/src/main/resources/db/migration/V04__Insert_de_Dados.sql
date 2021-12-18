INSERT INTO usuario (nome, senha, autoridades ) VALUES ('Admin', '$2a$10$5l7VBtTLjOYFjUCOnGCH5uny81vZWiD4DHAqdvIawT7jYjUt2bYBK', 'ROLE_USER,ROLE_ADMIN');
INSERT INTO usuario (nome, senha, autoridades ) VALUES ('User', '$2a$10$ggZCLzTRQ8zAKslJkIpELeVtq4LXAk3z6sl0BoLS9yExyD1.bTFIO', 'ROLE_USER');

INSERT INTO uav (nome, port)
VALUES ('uav_001', 5001),
       ('uav_002', 5002),
       ('uav_003', 5003),
       ('uav_004', 5004),
       ('uav_005', 5005),
       ('uav_006', 5006),
       ('uav_007', 5007),
       ('uav_008', 5008),
       ('uav_009', 5009),
       ('uav_010', 5010);

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