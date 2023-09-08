const { Router } = require('express');
const NotesController = require('../controllers/NotesController');

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.post('/', notesController.create);
notesRouter.get('/', notesController.showNotes);
notesRouter.get('/:user_id', notesController.showNotesByUser);
notesRouter.delete('/:id', notesController.delete);

module.exports = notesRouter;