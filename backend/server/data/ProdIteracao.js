const database = require('../infra/database');

exports.getProdutor = function (id){
    return database.oneOrNone('select * from produtor where id_produtor = $1', [id]);
};