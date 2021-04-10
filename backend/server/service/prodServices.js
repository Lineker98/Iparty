const prodData = require("../data/ProdIteracao");

exports.getProdutor = function (id) {
    return prodData.getProdutor(id);
};
