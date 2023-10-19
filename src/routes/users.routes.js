const multer = require('multer');
const { Router } = require('express');

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const uploadConfig = require('../configs/upload');

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.showAll);
usersRouter.put('/', usersController.updateProfile);
usersRouter.get('/:id', usersController.showUser);
usersRouter.delete('/:id', usersController.delete);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);


module.exports = usersRouter;