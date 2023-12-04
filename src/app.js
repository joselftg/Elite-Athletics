const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});