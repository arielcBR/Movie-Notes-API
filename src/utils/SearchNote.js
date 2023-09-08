const knex = require('../database/knex/index');

class SearchNote {
    static async byId(id) {
        const DoesNoteExist = await knex("movie_notes").where({ id });
        
        if (!DoesNoteExist.length)
            return false;
        
        return (DoesNoteExist[0]);
    }
};

module.exports = SearchNote;