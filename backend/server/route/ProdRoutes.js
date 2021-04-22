const express = require('express');
const router = express.Router();
const prodServices = require('../service/prodServices');
const generalServices = require('../service/generalServices');

// Pegar produtor pelo id
router.get('/:id', async function (req, res) {
    const produtor = await prodServices.getProdutor(req.params.id);
    res.json(produtor);
});

//Criação de festas
router.post('/creatParty', async (req, res) => {

    const party  = req.body;
    const id_produtor = req.body.id_produtor;

    try {
        
        newParty = await prodServices.creatParty(party);
        const id_festa = newParty.id_festa;

        await prodServices.partyByProductor(id_produtor, id_festa);

        console.log('Festa Criada com sucesso!');
        return res.send( newParty );


    }catch (error) {
        return res.status(400).send({ error: 'Falha na criação da festa!'});
    }

});


// registro de produtor e verificação 
// se é pessoa física ou jurídica
router.post('/register', async (req, res) => {

    
    const { email } = req.body;
    const produtor = req.body;

    if(produtor.cpf){

        try{
            if(await generalServices.existsEntityByEmail(email) == true){
                
                return res.status(400).send({ error: 'Email já cadastrado!'});
            }

            const identificador = await prodServices.creatProdutor(produtor);

            try {

                await prodServices.inserePessoaFisica(identificador.id_produtor, produtor.cpf);

                const newProdutor = await prodServices.getAllDataFisica(identificador.id_produtor);
                console.log('Cadastrado com sucesso!')

                newProdutor.senha = undefined;
                newProdutor['tipo'] = 'Produtor'
                res.send( newProdutor );

            } catch (error) {
                await prodServices.deleteProductor(identificador.id_produtor)
                return res.status(400).send({ error: 'Falha na verificação dos dados, tente novamente.'});
            }

        } catch (error){
            return res.status(400).send({ error: 'Falha no registro do produtor'});
        }
    }
    else{

        try{

            if(await generalServices.existsEntityByEmail(email) == true){
                return res.status(400).send({ error: 'Email já cadastrado!'});
            }

            const identificador = await prodServices.creatProdutor(produtor);

            try {

                await prodServices.inserePessoaJuridica(identificador.id_produtor, produtor.cnpj);
                const newProdutor = await prodServices.getAllDataJuridica(identificador.id_produtor);
                console.log('Cadastrado com sucesso!');

                newProdutor['tipo'] = 'Produtor'
                res.send( newProdutor );

            } catch (error) {
                await prodServices.deleteProductor(identificador.id_produtor)
                return res.status(400).send({ error: 'Falha na verificação dos dados, tente novamente!'});
            }

        }catch(error){
            return res.status(400).send({ error: 'Falha no registro do produtor'});
        }
    }

});


router.get('/listparties/:id', async function (req, res){

    try {

        const parties = await prodServices.getParties(req.params.id);
        res.json(parties);

    } catch (error) {
        return res.status(400).send({ error: 'Falha ao realizar busca de festas'});
    }
});

router.delete('/:id', async function(req, res) {

    try {
        await prodServices.deleteProductor(req.params.id);
        console.log('Produtor deletado com sucesso!')
        res.end();
    } catch (error) {
        console.log('Erro ao realizar exclusão de produtor!')
        return res.status(400).send({ error: 'Erro ao realizar exclusão de produtor!'});
    }
})

router.delete('/deleteParty/:id', async function(req, res) {
    
    try {
        await prodServices.deleteParty(req.params.id);
        console.log('Festa deletada com sucesso');
        res.end();
    } catch (error) {
        console.log('Erro ao realizar exclusão da festa!')
        return res.status(400).send({ error: 'Erro ao realizar exclusão da festa!'});
    }
})

router.put('/:id', async function(req, res) {
    
    const produtor = req.body;
    const email = produtor.email;
    const id_produtor = req.params.id;

    if(await generalServices.existsEntityByEmail( email ) == true){
        return res.status(400).send({ error: 'Email já cadastrado!'});
    }
     
    try {

        const newProdutor = await prodServices.updateProductor(id_produtor, produtor);
        console.log("Atualização do produtor realizada com sucesso!");
        res.json( newProdutor );
        
    } catch (error) {
        console.log('Erro ao atualizar o produtor')
        return res.status(204).send({ error: "Erro ao atualizar o produtor"})
    }
})

module.exports = router;