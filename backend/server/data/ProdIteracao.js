const database = require('../infra/database');

exports.getProdutor = function (id) {
    return database.oneOrNone('SELECT * FROM produtor WHERE id_produtor = $1', [id]);
};

exports.getProdutorByEmail = function(email){
    return database.oneOrNone('SELECT * FROM produtor WHERE email = $1', [email]);
};

exports.creatProdutor = function(produtor){
    return database.one('INSERT INTO produtor (nome, email, senha, telefone) VALUES ($1, $2, $3, $4) returning id_produtor',
    [produtor.nome, produtor.email, produtor.senha, produtor.telefone]);
};

exports.creatParty = function(party){
    return database.one('INSERT INTO Festa (preco, inicio, fim, descricao, longitude, latitude, nome_festa)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7) returning *',
    [party.preco, party.inicio, party.fim, party.descricao, party.longitude, party.latitude, party.nome_festa]);
}

exports.inserePessoaFisica = function(id_produtor, cpf){
    return database.oneOrNone('INSERT INTO pessoafisica (id_produtor, cpf) VALUES ($1, $2)', [id_produtor, cpf]);
};

exports.inserePessoaJuridica = function(id_produtor, cnpj){
    return database.oneOrNone('INSERT INTO pessoajuridica (id_produtor, cnpj) VALUES ($1, $2)', [id_produtor, cnpj]);
};

exports.getAllDataFisica = function(id_produtor){
    return database.oneOrNone("SELECT prod.id_produtor, prod.nome, prod.email, prod.senha, prod.telefone, prod.avaliacao, pf.cpf" +
                                " FROM produtor prod, pessoafisica pf" +
                                " WHERE prod.id_produtor = $1 AND  pf.id_produtor = $2", [id_produtor, id_produtor]);
};

exports.getAllDataJuridica = function(id_produtor){
    return database.oneOrNone("SELECT prod.id_produtor, prod.nome, prod.email, prod.senha, prod.telefone, prod.avaliacao, pj.cnpj" +
                                " FROM produtor prod, PessoaJuridica pj" +
                                " WHERE prod.id_produtor = $1 AND  pj.id_produtor = $2", [id_produtor, id_produtor]);
};

exports.deleteProductor = function(id_produtor){
    return database.result('delete FROM produtor WHERE id_produtor = $1', [id_produtor]);
};