const database = require('../infra/database');


exports.getUser = function (id){
    return database.oneOrNone('select * from usuario where id_usuario = $1', [id]);
};

exports.getUserByEmail = function(email){
    return database.oneOrNone('select * from usuario where email = $1', [email]);
}

exports.creatUser = function (user) {
    return database.one('insert into usuario (nome, cpf, email, senha, data_nascimento) values ($1, $2, $3, $4, $5) returning *',
    [user.nome, user.cpf, user.email, user.senha, user.data_nascimento])
};

exports.getPartiesByUser = function(id){
    return database.manyOrNone("select * from festa where id_festa in" +
    "(select id_festa from frequenta where id_usuario = $1)", [id]);
};

exports.getUserByName = function(name){
    return database.manyOrNone("select * from usuario where nome like $1", ['%' + name + '%']);
};

exports.updateUser = function (id_usuario, user){
    return database.one('UPDATE usuario SET nome = $1, cpf = $2, email = $3, senha = $4, data_nascimento = $5 WHERE id_usuario = $6 returning *',
    [user.nome, user.cpf, user.email, user.senha, user.data_nascimento, id_usuario]);
}

// exports.deleteUser = function (id) {
//     return database.none('delete from usuario where id_usuario = $1', [id]);
// }