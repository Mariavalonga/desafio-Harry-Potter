CREATE DATABASE atividade_harry_potter;

\c atividade_harry_potter;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(50),
    habilidade VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(50) NOT NULL
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento DECIMAL NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);

INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue) VALUES ('Harry Potter', 15, 'Gryffindor', 'Animagia ', 'bruxo');
INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue) VALUES ('Voldemort', 12, 'Slytherin', 'Cura', 'bruxo');

INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ('madeira de azevinho', 28, 'pena de fênix', '2021-01-01');
INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ('teixo', 34, 'pena de fênix', '2022-02-02');