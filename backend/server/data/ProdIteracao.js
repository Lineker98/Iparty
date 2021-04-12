const database = require('../infra/database');

exports.getProdutor = function (id) {
    return database.oneOrNone('select * from produtor where id_produtor = $1', [id]);
};

exports.getProdutorByEmail = function( email ){
    return database.oneOrNone('select * from produtor where email = $1', [email]);
};

exports.creatProdutor = function( produtor ){
    return database.one('insert into produtor (nome, email, senha, telefone) values ($1, $2, $3, $4) returning id_produtor',
    [produtor.nome, produtor.email, produtor.senha, produtor.telefone]);
};

exports.inserePessoaFisica = function(id_produtor, cpf){
    return database.oneOrNone('insert into pessoafisica (id_produtor, cpf) values ($1, $2)', [id_produtor, cpf]);
};

exports.inserePessoaJuridica = function(id_produtor, cnpj){
    return database.oneOrNone('insert into pessoajuridica (id_produtor, cnpj) values ($1, $2)', [id_produtor, cnpj]);
};

exports.getAllDataFisica = function(id_produtor){
    return database.oneOrNone("select prod.id_produtor, prod.nome, prod.email, prod.senha, prod.telefone, prod.avaliacao, pf.cpf" +
                                " from produtor prod, pessoafisica pf" +
                                " where prod.id_produtor = $1 AND  pf.id_produtor = $2", [id_produtor, id_produtor]);
};

exports.getAllDataJuridica = function(id_produtor){
    return database.oneOrNone("select prod.id_produtor, prod.nome, prod.email, prod.senha, prod.telefone, prod.avaliacao, pj.cnpj" +
                                " from produtor prod, PessoaJuridica pj" +
                                " where prod.id_produtor = $1 AND  pj.id_produtor = $2", [id_produtor, id_produtor]);
};