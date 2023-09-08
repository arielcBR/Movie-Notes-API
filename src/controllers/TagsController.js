const knex = require('../database/knex/index');
const AppError = require('../utils/AppError');
const SearchUser = require('../utils/SearchUser');
const SearchNote = require('../utils/SearchNote');

class NotesController{
    async create(req, res) {
        const {note_id, user_id, name} = req.body;

        const user = await SearchUser.byId(user_id);
        const note = await SearchNote.byId(note_id);
        
        if (!name)
            throw new AppError("Name is required!");
        if (!user)
            throw new AppError("The user is invalid, try it again!");
        if (!note)
            throw new AppError("The note is invalid, try it again!");
        if (user_id != note.user_id)
            throw new AppError(`The note does not belong to the user ${user.name}`);
        
        await knex("movie_tags").insert({
            note_id,
            user_id,
            name: name.toLowerCase()
        });

        return res.json({message: "Tag has been created!"});
    }

    async showNotes(req, res) {
        const notes = await knex("movie_notes");

        if (!notes.length)
            return new AppError("There is no notes registered yet!");

        return res.json({ ...notes });
    }

    async showNotesByUser(req, res) {
        const { user_id } = req.params;
        const user = await SearchUser.byId(user_id);
        
        if (!user)
            throw new AppError("The user does not exist!");

        const notes = await knex("movie_notes").where({ user_id: user.id }).orderBy("rating", "desc");

        if (!notes.length)
            return res.json({ message: "The user did not register any note yet!" });

        return res.json({notes});
    }

    async delete(req, res) {
        const { id } = req.params;

        const note = await knex("movie_notes").where({ id });
        
        if (!note.length)
            throw new AppError("The note does not exist!");

        await knex("movie_notes").where({ id }).del();

        return res.json({message: "The note has been deleted!"});
    }

}

module.exports = NotesController;