const knex = require('../database/knex/index');
const { hash, compare } = require('bcrypt');
const AppError = require('../utils/AppError');
const SearchUser = require('../utils/SearchUser');
const validateEmail = require('../utils/emailValidation');

class UsersController{
    async create(req, res) {
        const { name, email, password } = req.body;
        const isEmailValid = validateEmail(email);

        if (!name)
            throw new AppError("The field name is required!");
        if (!email)
            throw new AppError("The field email is required!");
        if (isEmailValid == null)
            throw new AppError("The email is not valid");
        if(!password)
            throw new AppError("The field password is required!");
        
        const hashedPassword = await hash(password, 10);

        const user = await knex('users')
            .where({ email });
      
        if (!user.length) {
            await knex('users').insert({
                name,
                email,
                password: hashedPassword
            });
    
            return res.json({message: "The user has been created!"});  
        }
        
        return new AppError("The email is already registered!");  
    }

    async showAll(req, res) {
        const users = await knex('users');

        if (!users.length)
            return res.json({ message: "There is no users registered yet!" });

        return res.json({ ...users });
    }

    async showUser(req, res) {
        const { id } = req.params;
        const user = await knex('users').where({ id });
        
        if (!user.length)
        new AppError("There is no user registered yet!");

        return res.json({
            "User": user[0].name,
            "Email": user[0].email,
            "Avatar": user[0].avatar
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        const user = await knex('users').where({ id });

        if (!user.length)
        new AppError("There is no user registered!");


        await knex('users').where({ id }).del();
        return res.json({ message: "The user has been deleted!"});
    }

    async updatePassword(req, res) {
        const { email, old_password, new_password } = req.body;
        const user = await SearchUser.byEmail(email);

        if (!user)
            throw new AppError("The user does not exist!");

        const passwordIsOk = await compare(old_password, user.password);

        if (!passwordIsOk)
            throw new AppError("the old password does not match!");

        const newPasswordHashed = await hash(new_password, 10);

        await knex("users").where({ email }).update({ password: newPasswordHashed });

        return res.json({ message: "The password has been changed!" });
    }
}

module.exports = UsersController;