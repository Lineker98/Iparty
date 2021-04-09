const userData = require("../data/UserInteracao");

exports.getUsers = function () {
    return userData.getUsers();
};

exports.getUser = function (id) {
    return userData.getUser(id);
};

exports.getUserByEmail = function(email){
    return userData.getUserByEmail(email);
}

// exports.saveUser = function (user) {
//     return userData.saveUser(user);
// };

// exports.deleteUser = function (id) {
//     return userData.delete(id);
// };

// exports.updateUser = function(id, user){
//      return userData.updateUser(id, user)
// };