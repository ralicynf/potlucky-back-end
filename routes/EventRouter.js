const Router = require('express').Router()
const controller = require('../controllers/EventController')

// insert routes here
Router.get('/', controller.getAllEvents)
Router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.createEvent
)
Router.get('/:event_id', controller.getEventById)
Router.put(
  '/:event_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.updateEvent
)
Router.delete(
  '/:event_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.deleteEvent
)

module.exports = Router
