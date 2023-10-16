const { Router } = require('express');
const sessionRoutes = Router();
const SessionsController = require('../controllers/SessionsController');

sessionRoutes.post('/', SessionsController.create)

module.exports = sessionRoutes;
