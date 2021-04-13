const express = require('express');
const router = express.Router();
const prodServices = require('../service/prodServices');


router.get('/:id', async function (req, res) {
    const produtor = await prodServices.getProdutor(req.params.id);
    res.json(produtor);
});

router.post('/register', async (req, res) => {
    
    const { email } = req.body;
    const produtor = req.body;

    if(produtor.cpf){

        try{

            if(await prodServices.getProdutorByEmail(email) !== null){
                return res.status(400).send({ error: 'Email já cadastrado!'});
            }

            const identificador = await prodServices.creatProdutor(produtor);

            try {

                await prodServices.inserePessoaFisica(identificador.id_produtor, produtor.cpf);

                const newProdutor = await prodServices.getAllDataFisica(identificador.id_produtor);
                console.log('Cadastrado com sucesso!')

                newProdutor.senha = undefined;
                return res.send({ newProdutor });

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

            if(await prodServices.getProdutorByEmail(email) !== null){
                return res.status(400).send({ error: 'Email já cadastrado!'});
            }

            const identificador = await prodServices.creatProdutor(produtor);

            try {

                await prodServices.inserePessoaJuridica(identificador.id_produtor, produtor.cnpj);
                const newProdutor = await prodServices.getAllDataJuridica(identificador.id_produtor);
                console.log('Cadastrado com sucesso!');

                newProdutor.senha = undefined;
                return res.send({ newProdutor });

            } catch (error) {
                await prodServices.deleteProductor(identificador.id_produtor)
                return res.status(400).send({ error: 'Falha na verificação dos dados, tente novamente!'});
            }

        }catch(error){
            return res.status(400).send({ error: 'Falha no registro do produtor'});
        }
    }

});

module.exports = router;