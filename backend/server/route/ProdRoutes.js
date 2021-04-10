const express = require('express');
const router = express.Router();
const prodServices = require('../service/prodServices');


router.get('/:id', async function (req, res) {
    const produtor = await prodServices.getProdutor(req.params.id);
    res.json(produtor);
});




module.exports = router;