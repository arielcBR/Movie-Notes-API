const sqliteConnection = require('../database/sqlite/index')
const AppError = require('../utils/AppError');

class UsersController{
    async create(req, res) {
        const { name, password, age, email } = req.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkUserExist) {
            throw new Error('Este e-mail já está em uso.');
        }

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return res.status(201).json();
    }
}

module.exports = UsersController;