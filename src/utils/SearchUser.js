const knex = require('../database/knex/index');

class SearchUser {
    static async byEmail(email) {
        const userExist = await knex("users").where({ email });
        
        if (!userExist.length)
            return false;
        
        return (userExist[0]);
    }
    static async byId(id) {
        const userExist = await knex("users").where({ id });
        
        if (!userExist.length)
            return false;
        
        return (userExist[0]);
    }
};

module.exports = SearchUser;