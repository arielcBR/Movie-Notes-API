const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.showAll);
usersRouter.put('/', usersController.updateProfile);
usersRouter.get('/:id', usersController.showUser);
usersRouter.delete('/:id', usersController.delete);
usersRouter.patch('/password', usersController.updatePassword);


module.exports = usersRouter;