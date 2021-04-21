const prodData = require("../data/ProdIteracao");

exports.getProdutor = function (id_produtor) {
    return prodData.getProdutor(id_produtor);
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

exports.getAllDataFisica = function(id_produtor){
    return prodData.getAllDataFisica(id_produtor);
};

exports.getAllDataJuridica = function(id_produtor){
    return prodData.getAllDataJuridica(id_produtor);
};

exports.deleteProductor = function(id_produtor){
    return prodData.deleteProductor(id_produtor);
};

exports.getParties = function(id_produtor){
    return prodData.getParties(id_produtor);
};


