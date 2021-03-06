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

exports.updateUser = function(id_usuario, user){
    return userData.updateUser(id_usuario, user)
};

exports.userInParty = function(id_usuario, id_festa){
    return userData.userInParty(id_usuario, id_festa);
};

exports.partiesByDays = function(today, period){
    return userData.partiesByDay(today, period);
}

exports.deleteUser = function (id) {
    return userData.deleteUser(id);
};
