const express = require('express');
const router = express.Router();
const userService = require("../service/userServices");

// All users
// router.get('/', async function (req, res) {
//     const users = await userService.getUsers();
//     res.json(users);
// });


// Criação do usuario
router.post('/register', async (req, res) => {

    const { email } = req.body;
    const user = req.body;

    try{

        if(await userService.getUserByEmail( email ) !== null){
            return res.status(400).send({ error: 'Email já cadastrado!'});
        };

        const newUser = await userService.creatUser(user);
        newUser.senha = undefined;
        console.log('Usuário criado com sucesso!');
        return res.send({ newUser });

    } catch (err) {
       return res.status(400).send({ error: 'Falha no registro!'});
    }
    
});

router.get('/listparties/:id', async function (req, res){
    const parties = await userService.getPartiesByUser(req.params.id);
    res.json(parties);
});

router.get('/listusers/:name', async function (req, res) {
    const users = await userService.getUserByName(req.params.name);
    res.send({users});
})
 
router.get('/listuser/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

 router.put('/updateUser/:id', async function (req, res) {

    const user = req.body;
    const id_usuario = req.params.id
    try {

        const newUser = await userService.updateUser(id_usuario, user);
        console.log('Usuário atualizado com sucesso!');
        res.json( newUser )

    } catch (error) {
        console.log('Usuáio não encontrado!');
        return res.status(204);
    }
});

// router.delete('/:id',  async function (req, res) {
//     await userService.deleteUser(req.params.id);
//     res.end();
// });

module.exports = router;
