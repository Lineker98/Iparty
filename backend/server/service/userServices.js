const userData = require("../data/UserInteracao");

exports.getUsers = function() {
    return userData.getUsers();
};

exports.getUser = function(id) {
    return userData.getUser(id);
};

exports.getUserByEmail = function(email){
    return userData.getUserByEmail(email);
}

exports.creatUser = function(user) {
    return userData.creatUser(user);
};

exports.getPartiesByUser = function(id_usuario){
    return userData.getPartiesByUser(id_usuario);
}

exports.getUserByName = function(name){
    return userData.getUserByName(name);
};

// exports.deleteUser = function (id) {
//     return userData.delete(id);
// };

exports.updateUser = function(id, user){
    return userData.updateUser(id, user)
};