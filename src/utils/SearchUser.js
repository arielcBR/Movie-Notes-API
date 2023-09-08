const knex = require('../database/knex/index');
const AppError = require('./AppError');

class SearchUser {
    static async byEmail(email) {
        const userExist = await knex("users").where({ email });
        
        if (!userExist.length)
            return false;
        
        return (userExist[0]);
    }
};

module.exports = SearchUser;