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

    try {
        
        if( await prodServices.getProdutorByEmail( email ) !== null){
            return res.status(400).send({ error: 'Email já cadastrado'})
        }

        const newProdutor = await prodServices.CreatProdutor( produtor );
        newProdutor.senha = undefined;
        return res.send({ newProdutor });

    } catch (error) {
        return res.status(400).send({ error: 'Falha no registro do produtor'});
    }
})

module.exports = router;