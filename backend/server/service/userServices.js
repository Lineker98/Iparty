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

 exports.creatUser = function (user) {
    return userData.creatUser(user);
};

// exports.deleteUser = function (id) {
//     return userData.delete(id);
// };

// exports.updateUser = function(id, user){
//      return userData.updateUser(id, user)
// };