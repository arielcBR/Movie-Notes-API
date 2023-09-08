const knex = require('../database/knex/index');

class SearchUser {
    static async byEmail(email) {
        const DoesUserExist = await knex("users").where({ email });
        
        if (!DoesUserExist.length)
            return false;
        
        return (DoesUserExist[0]);
    }
    static async byId(id) {
        const DoesUserExist = await knex("users").where({ id });
        
        if (!DoesUserExist.length)
            return false;
        
        return (DoesUserExist[0]);
    }
};

module.exports = SearchUser;