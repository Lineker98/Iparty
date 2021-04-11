CREATE TABLE Usuario (
  id_usuario BIGSERIAL NOT NULL PRIMARY KEY,
  nome varchar NOT NULL,
  cpf char(11) NOT NULL,
  email varchar NOT NULL,
  senha varchar NOT NULL,
  data_nascimento date,
	
  CHECK (length(senha) >= 6),
  CHECK (length(cpf) = 11),
  CHECK (email Like '%@%.%')
);

CREATE TABLE Festa (
	id_festa BIGSERIAL PRIMARY KEY,
	preco float default 0.0,
  	inicio timestamp NOT NULL,
  	fim timestamp,
	descricao text,
	longitude float8 NOT NULL, 
	latitude float8 NOT NULL,
	nome_festa varchar default 'No name'
);

CREATE TABLE Produtor (
  	id_produtor BIGSERIAL PRIMARY KEY,
  	nome varchar NOT NULL,
  	email varchar NOT NULL,
	senha varchar NOT NULL,
  	telefone varchar,
  	avaliacao int default 0,
	
	CHECK (avaliacao >=0 and avaliacao<=5),
	CHECK (length(senha) >= 6),
  	CHECK (email Like '%@%.%')
);

CREATE TABLE PessoaFisica (
  	id_produtor int PRIMARY KEY,
  	cpf char(11) NOT NULL UNIQUE,
	
	CHECK (length(cpf) = 11),
	FOREIGN KEY (id_produtor) REFERENCES Produtor (id_produtor)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PessoaJuridica (
	id_produtor int PRIMARY KEY,
  	cnpj char(14) NOT NULL UNIQUE,
	
	CHECK (length(cnpj) = 14),
	FOREIGN KEY (id_produtor) REFERENCES Produtor (id_produtor)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Produz (
  	id_produtor int,
  	id_festa int,
	
  	PRIMARY KEY (id_produtor, id_festa),
	FOREIGN KEY (id_produtor) REFERENCES Produtor (id_produtor),
	FOREIGN KEY (id_festa) REFERENCES Festa (id_festa)
);

CREATE TABLE Frequenta (
  	id_usuario int,
  	id_festa int,
  
	PRIMARY KEY (id_usuario, id_festa),
	FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
	FOREIGN KEY (id_festa) REFERENCES Festa (id_festa)
);






