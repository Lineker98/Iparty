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

exports.deleteParty = function(id_festa){
    return prodData.deleteParty(id_festa);
}

exports.updateProductor = function(id_produtor, produtor){
    return prodData.updateProductor(id_produtor, produtor);
};

exports.updatePessoaFisica = function(id_produtor, cpf){
    return prodData.updatePessoaFisica(id_produtor, cpf);
};

exports.updatePessoaJuridica = function(id_produtor, cnpj){
    return prodData.updatePessoaJuridica(id_produtor, cnpj);
}


