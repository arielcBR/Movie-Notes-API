require('express-async-errors');
const express = require('express');

const AppError = require('./utils/AppError.js');
const routes = require('./routes/index.js') // Irá carregar o arquivo index.js 
const database = require('./database/sqlite/index.js')


const app = express();
const port = 3000;

app.use(express.json());

//Database

app.use(routes);
database();

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    console.error(error);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(port, () => { 
    console.log(`Server online na porta ${port}`);
});