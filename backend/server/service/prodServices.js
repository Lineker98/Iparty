const prodData = require("../data/ProdIteracao");

exports.getProdutor = function (identificador) {
    return prodData.getProdutor(identificador);
};

exports.getProdutorByEmail = function(email){
    return prodData.getProdutorByEmail(email);
};

exports.creatProdutor = function(produtor){
    return prodData.creatProdutor(produtor);
};

exports.creatParty = function(party){
    return prodData.creatParty(party);
};

exports.partyByProductor = function(id_produtor, id_festa){
    return prodData.partyByProductor(id_produtor, id_festa);
}

exports.inserePessoaFisica = function(id, cpf){
    return prodData.inserePessoaFisica(id, cpf);
};

exports.inserePessoaJuridica = function(id, cnpj){
    return prodData.inserePessoaJuridica(id, cnpj);
};

exports.getAllDataFisica = function(identificador){
    return prodData.getAllDataFisica(identificador);
};

exports.getAllDataJuridica = function(identificador){
    return prodData.getAllDataJuridica(identificador);
};

exports.deleteProductor = function(id_produtor){
    return prodData.deleteProductor(id_produtor);
};

exports.getParties = function(id_produtor){
    return prodData.getParties(id_produtor);
};

