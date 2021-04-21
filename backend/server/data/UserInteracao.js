const database = require('../infra/database');


exports.getUser = function (id){
    return database.oneOrNone('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
};

exports.getUserByEmail = function(email){
    return database.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email]);
}

exports.creatUser = function(user) {
    return database.one('INSERT INTO usuario (nome, cpf, email, senha, data_nascimento) VALUES ($1, $2, $3, $4, $5) returning *',
    [user.nome, user.cpf, user.email, user.senha, user.data_nascimento])
};

exports.getPartiesByUser = function(id){
    return database.manyOrNone("SELECT * FROM festa WHERE id_festa in" +
    "(SELECT id_festa FROM frequenta WHERE id_usuario = $1)", [id]);
};

exports.getUserByName = function(name){
    return database.manyOrNone("SELECT * FROM usuario WHERE nome like $1", ['%' + name + '%']);
};

exports.updateUser = function(id_usuario, user){
    return database.one('UPDATE usuario SET nome = $1, cpf = $2, email = $3, senha = $4, data_nascimento = $5 WHERE id_usuario = $6 returning *',
    [user.nome, user.cpf, user.email, user.senha, user.data_nascimento, id_usuario]);
}

exports.userInParty = function(id_usuario, id_festa){
    return database.none('INSERT INTO frequenta (id_usuario, id_festa) VALUES ($1, $2)',
    [id_usuario, id_festa]);
};

exports.partiesByDay = function(today, period){
    return database.manyOrNone('SELECT * FROM festa WHERE inicio BETWEEN $1 and $2', [today, period])
}

// exports.deleteUser = function (id) {
//     return database.none('delete FROM usuario WHERE id_usuario = $1', [id]);
// }