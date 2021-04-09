const express = require('express')
const app = express();

app.use(express.json());
app.use('/user', require('./route/UserRoutes'));

app.listen(3000);