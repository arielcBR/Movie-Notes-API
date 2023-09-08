const { Router } = require('express');
const TagsController = require('../controllers/TagsController');

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.post('/', tagsController.create);
tagsRouter.get('/', tagsController.showNotes);
tagsRouter.get('/:user_id', tagsController.showNotesByUser);
tagsRouter.delete('/:id', tagsController.delete);

module.exports = tagsRouter;