const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

// insert routes here
Router.get('/', controller.getAllUsers)
Router.get('/:user_id', controller.getUserById)
Router.put(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateUser
)
Router.delete(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteUser
)

module.exports = Router
