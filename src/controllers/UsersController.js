const AppError = require('../utils/AppError');

class UsersController{
    create(req, res) {
        const { name, password, age, email } = req.body;

        if (!name) {
            throw new AppError("O nome é obrigatório", 400);
        }

        res.status(201).json({ name, password, age, email });
    }
}

module.exports = UsersController;