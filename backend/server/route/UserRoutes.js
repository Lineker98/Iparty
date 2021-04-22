const express = require('express');
const router = express.Router();
const userService = require("../service/userServices");
const generalServices = require('../service/generalServices');


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

        if(await generalServices.existsEntityByEmail( email ) == true){
            return res.status(400).send({ error: 'Email já cadastrado!'});
        };

        const newUser = await userService.creatUser(user);
        newUser.senha = undefined;
        
        newUser['tipo'] = 'usuario';
        console.log('Usuário criado com sucesso!');
        return res.send(newUser);

    } catch (err) {
       return res.status(400).send({ error: 'Falha no registro!'});
    }
    
});

// Listagem de todas as festas frequentadas pelo usuario
router.get('/listparties/:id', async function (req, res){
    const parties = await userService.getPartiesByUser(req.params.id);
    res.json(parties);
});

// Listar usuários pelo nome recebido
router.get('/listusers/:name', async function (req, res) {
    const users = await userService.getUserByName(req.params.name);
    res.send({users});
})
 
// Pegar usuário pelo ID
router.get('/listuser/:id', async function (req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

// Atualizar informações do usuário
router.put('/updateUser/:id', async function (req, res) {

    const user = req.body;
    const email = user.email;
    const id_usuario = req.params.id;
    try {

        if(await generalServices.existsEntityByEmail( email ) == true){
            return res.status(400).send({ error: 'Email já cadastrado!'});
        }
        const newUser = await userService.updateUser(id_usuario, user);
        console.log('Usuário atualizado com sucesso!');
        res.json( newUser )

    } catch (error) {
        console.log('Erro na atualização do usuário!');
        return res.status(204);
    }
});

router.get('/dataParties/:id', async function (req, res) {

    const interval = parseInt(req.params.id);

    now = new Date;

    const Year = now.getFullYear();
    const Month = now.getMonth();
    const Day = now.getDate();
    
    period = new Date(Year, Month, Day + interval);
    today = new Date(Year, Month, Day);
    

    try {

        const parties = await userService.partiesByDays(today, period);
        console.log('Festas encontradas');
        res.json(parties);

    } catch (error) {
        console.log('Erro na busca por festas');
        return res.status(400).send({error: "Error na busca por festas"})
    }

})

// Registrar as festas frequentadas pelo usário
router.post('/UserInParty', async function (req, res) {

    const id_usuario = req.body.id_usuario;
    const id_festa = req.body.id_festa;

    try {
        await userService.userInParty(id_usuario, id_festa);
        console.log('Registro na festa realizado com sucesso!');
        res.send({id_usuario, id_festa});

    } catch (error) {
        console.log('Não foi possível realizar o registro na festa!');
        return res.status(400).send({error: "Não foi possível realizar o registro na festa"})
    };
});

router.delete('/:id',  async function (req, res) {
    await userService.deleteUser(req.params.id);
    console.log('Usuário deletado com sucesso!')
    res.end();
});

module.exports = router;
