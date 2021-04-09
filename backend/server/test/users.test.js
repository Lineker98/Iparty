const axios = require('axios');
const userService = require('../service/User/userServices');

const request = function (url, method, data) {
    return axios({ url, method, data});
}



test('Should get users', async function () {

    const response = await request("http://localhost:3000/", "get");
    const users = response.data;
    expect(users).toHaveLength(5);
        
});
    
test('Should save users', async function () {
    
    const data = {nome: 'Lineker', cpf: '57843803234'}
    const response = await request("http://localhost:3000/", "post", data);
    const users = response.data;
    expect(users.name).toBe(data.name);
    expect(users.cpf).toBe(data.cpf);
    
});
