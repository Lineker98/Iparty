const express = require('express');
const router = express.Router();
const userService = require("../service/userServices");
const prodService = require("../service/prodServices");


router.post('/authenticate', async (req, res) => {

    const { email, senha } = req.body;

    const user = await userService.getUserByEmail(email);
    const productor = await prodService.getProdutorByEmail(email);

    if( user !== null ){

        if( user.senha != senha ){
            return res.status(400).send({ error: 'Senha inválida' });
        }

        user.senha = undefined;
        user['tipo'] = 'usuario';
        console.log('Acesso permitido!');
        res.json(user);
    }
    else if( productor !== null){

        if(productor.senha !== senha){
            return res.status(400).send({ error: 'Senha inválida' });
                
        }

        productor.senha = undefined;
        productor['tipo'] = 'produtor';
        console.log('Acesso permitido!');
        res.json(productor);
    }
    else{
        return res.status(400).send({ error: 'Usuário não encontrado'})
    }

});

module.exports = router;