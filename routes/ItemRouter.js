const Router = require('express').Router()
const controller = require('../controllers/ItemController')
const middleware = require('../middleware')

// insert routes here
Router.get('/', controller.getAllItems)
Router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.createItem
)
Router.get('/:item_id', controller.getItemById)
Router.get('/events/:event_id', controller.getItemByEvent)
Router.put(
  '/:item_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateItem
)
Router.delete(
  '/:item_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteItem
)

module.exports = Router
