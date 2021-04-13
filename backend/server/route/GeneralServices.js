const express = require('express');
const router = express.Router();
const userService = require("../service/userServices");
const prodService = require("../service/prodServices");


router.post('/authenticate', async (req, res) => {

    const { email, senha } = req.body;

    const user = await userService.getUserByEmail(email);

    if( user === null ){
        return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    if( user.senha != senha ){
        return res.status(400).send({ error: 'Senha inválida' });
    }

    user.senha = undefined;
    user['tipo'] = 'usuario';
    res.send({ user });
});

module.exports = router;