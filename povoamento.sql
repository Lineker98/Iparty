-- Usuario 
insert into Usuario (nome, cpf, email, senha, data_nascimento) values ('Laurene Scarrisbrick', '57843803229', 'lscarrisbrick0@mlb.com', 'Ih3dyDXq', '2021-02-15');
insert into Usuario (nome, cpf, email, senha, data_nascimento) values ('Milton Fleis', '10271410599', 'mfleis1@discovery.com', 'rPbS3JOc1', '2020-08-27');
insert into Usuario (nome, cpf, email, senha, data_nascimento) values ('Zandra Easlea', '48466712622', 'zeaslea2@reverbnation.com', 'uWmRTGVc', '2020-08-13');
insert into Usuario (nome, cpf, email, senha, data_nascimento) values ('Laurel Brind', '71130657133', 'lbrind3@sphinn.com', 'IEoLU2diFSM', '2020-05-22');
insert into Usuario (nome, cpf, email, senha, data_nascimento) values ('Rafaellle Casley', '55493339892', 'rcasley4@wunderground.com', '7AEm85HXLad', '2021-01-01');

-- Festa
insert into Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa) values (60.95, '2020-05-26 17:30:34', null, null, -77.1973997, -64.1582003, 'varius integer ac');
insert into Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa) values (62.44, '2021-06-12 09:54:27', '2020-05-14 23:34:31', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 35.92144, 115.8693718, 'nunc nisl duis bibendum');
insert into Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa) values (0.71, '2021-05-19 00:10:11', '2021-02-23 08:17:54', 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 114.375743, -72.483507, 'in tempor turpis nec euismod');
insert into Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa) values (0.23, '2020-11-23 19:54:38', '2020-06-30 08:54:47', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 20.7765351, 104.5946633, 'sed vel enim sit amet');
insert into Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa) values (16.49, '2020-11-08 16:01:26', '2020-09-30 21:59:22', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.', 11.8884682, 121.0404991, 'vel lectus in quam fringilla');


-- PRODUTOR
insert into Produtor (nome, email, senha, telefone, avaliacao) values ('Isak Korn', 'ikorn0@microsoft.com', 'XUbyQwm', '+48 (978) 816-0344', 5);
insert into Produtor (nome, email, senha, telefone, avaliacao) values ('Emilie Van der Daal', 'evan1@fc2.com', 'aJlvlmwTyqBY', '+33 (869) 349-7561', 0);
insert into Produtor (nome, email, senha, telefone, avaliacao) values ('Rickard Cureton', 'rcureton2@weather.com', '0wkDCW', '+86 (919) 242-9528', 2);
insert into Produtor (nome, email, senha, telefone, avaliacao) values ('Krysta Schoffel', 'kschoffel3@photobucket.com', 'UQWSBz4IRE8', '+33 (948) 600-1249', 5);
insert into Produtor (nome, email, senha, telefone, avaliacao) values ('Mariellen MacAindreis', 'mmacaindreis4@taobao.com', 'oDULBE34', '+235 (371) 503-0394', 2);

-- PESSOA FISICA
insert into PessoaFisica (id_produtor, cpf) values (3, '03558359952');
insert into PessoaFisica (id_produtor, cpf) values (5, '99882726172');


-- PESSOA JURIDICA
insert into PessoaJuridica (id_produtor, cnpj) values (2, '56925714176957');
insert into PessoaJuridica (id_produtor, cnpj) values (1, '14397622275982');
insert into PessoaJuridica (id_produtor, cnpj) values (4, '43093514411678');

-- PRODUZ

insert into Produz (id_produtor, id_festa) values (1, 2);
insert into Produz (id_produtor, id_festa) values (4, 3);
insert into Produz (id_produtor, id_festa) values (3, 1);
insert into Produz (id_produtor, id_festa) values (2, 4);
insert into Produz (id_produtor, id_festa) values (5, 5);

-- Frequenta
insert into Frequenta (id_usuario, id_festa) values (1, 1);
insert into Frequenta (id_usuario, id_festa) values (1, 2);
insert into Frequenta (id_usuario, id_festa) values (1, 5);
insert into Frequenta (id_usuario, id_festa) values (3, 2);
insert into Frequenta (id_usuario, id_festa) values (3, 4);
insert into Frequenta (id_usuario, id_festa) values (2, 1);
insert into Frequenta (id_usuario, id_festa) values (2, 4);
insert into Frequenta (id_usuario, id_festa) values (4, 3);
insert into Frequenta (id_usuario, id_festa) values (4, 5);
insert into Frequenta (id_usuario, id_festa) values (5, 1);
insert into Frequenta (id_usuario, id_festa) values (5, 2);
