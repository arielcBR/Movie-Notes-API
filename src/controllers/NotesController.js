const knex = require('../database/knex/index');
const AppError = require('../utils/AppError');

class NotesController{
    async create(req, res) {
        const { title, description, rating, user_id } = req.body;

        const user = await knex("users").where({ id: user_id });
        
        if (!title)
            throw new AppError("Title is required!");
        if (!description)
            throw new AppError("Description is required!");
        if (rating < 1 || rating > 5 || !Number.isInteger(rating))
            throw new AppError("The value of rating is not valid!");
        if (!user.length)
            throw new AppError("The user is invalid, try it again!");

        await knex("movie_notes").insert({
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            rating,
            user_id
        });

        return res.json({message: "Note has been created!"});
    }

    async showNotes(req, res) {
        const notes = await knex("movie_notes");

        if (!notes.length)
            return new AppError("There is no notes registered yet!");

        return res.json({ ...notes });
    }

    async showNotesByUser(req, res) {
        const { user_id } = req.params;
        const user = await knex('users').where({ id: user_id });
        
        if (!user.length)
            throw new AppError("The user does not exist!");

        const notes = await knex("movie_notes").where({ user_id }).orderBy("rating", "desc");

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