require('express-async-errors');
const express = require('express');
const cors = require('cors');

const AppError = require('./utils/AppError.js');
const uploadConfig = require('./configs/upload')
const routes = require('./routes/index.js') 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);
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