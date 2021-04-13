const express = require('express')
const app = express();

app.use(express.json());
app.use('/user', require('./route/UserRoutes'));
app.use('/produtor', require('./route/ProdRoutes'));
app.use('/general', require('./route/ProdRoutes'));

app.listen(3000);