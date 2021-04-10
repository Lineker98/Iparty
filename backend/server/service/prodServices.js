const prodData = require("../data/ProdIteracao");

exports.getProdutor = function (id) {
    return prodData.getProdutor(id);
};

exports.getProdutorByEmail = function( email ){
    return prodData.getProdutorByEmail( email );
}

exports.creatProdutor = function( produtor ){
    return prodData.creatProdutor(produtor);
}