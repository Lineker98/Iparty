const database = require('../infra/database');

exports.getProdutor = function ( id) {
    return database.oneOrNone('select * from produtor where id_produtor = $1', [id]);
};

exports.getProdutorByEmail = function( email ){
    return database.oneOrNone('select * from produtor where email = $1', [email]);
};

exports.creatProdutor = function( produtor ){
    return database.one('insert into produtor (nome, email, senha, telefone) values ($1, $2, $3, $4) returning *',
    [produtor.nome, produtor.email, produtor.senha, produtor.telefone])
};