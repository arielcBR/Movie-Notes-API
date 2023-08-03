const {hash, genSalt, compare} = require('bcryptjs');
const sqliteConnection = require('../database/sqlite/index');
const AppError = require('../utils/AppError');

class UsersController{
    async create(req, res) {
        const { name, password, age, email } = req.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkUserExist) {
            throw new Error('Este e-mail já está em uso.');
        }

        const hashedPassword = await genSalt(8, password);
    
        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]);
    
        return res.status(201).json();
    }

    async update(req, res) {
        const { name, password, email, old_password } = req.body; 
        const {id} = req.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user){
            throw new AppError('Usuário não encontrado');
        }
        
        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)',[email])
        if (userWithUpdatedEmail && userWithUpdatedEmail.id != id) {
            throw new AppError('Este e-mail já está em uso');
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError('Você precisa informar a senha antiga para trocar a senha');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(password, old_password);
            if (!checkOldPassword) {
                throw new AppError(' A senha antiga não coincide!');
            }
        }

        user.password = await genSalt(8, password);;

        await database.run(`
            UPDATE users SET
            name = ?,
            password = ?,
            email = ?,
            updated_at = DATETIME('now)
            WHERE id = ?`,
            [user.name, user.password, user.email, new Date(), id]);
        
        return res.json();
    }

}

module.exports = UsersController;