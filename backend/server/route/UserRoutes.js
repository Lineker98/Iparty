const express = require('express');
const router = express.Router();
const userService = require("../service/userServices");

// All users
router.get('/', async function (req, res) {

    const users = await userService.getUsers();
    res.json(users);

});

// Only one user
router.get('/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

// Authentication
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

    res.send({ user });
});


// Criação do usuario
router.post('/register', async (req, res) => {

    const { email } = req.body;
    console.log(email);
    const user = req.body;

    try{

        if(await userService.getUserByEmail( email ) !== null){
            return res.status(400).send({ error: 'Email já existente!'});
        }

        const newUser = await userService.creatUser(user);
        newUser.senha = undefined;
        return res.send({ newUser });

    } catch (err) {
       return res.status(400).send({ error: 'Falha no registro!'});
    }
    
 });

// router.put('/:id', async function (req, res) {
//     const user = req.body;
//     await userService.updateUser(req.params.id, user);
//     res.end();
// });

// router.delete('/:id',  async function (req, res) {
//     await userService.deleteUser(req.params.id);
//     res.end();
// });

module.exports = router;