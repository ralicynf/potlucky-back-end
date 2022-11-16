const Router = require('express').Router()
const controller = require('../controllers/EventController')
const middleware = require('../middleware')

// insert routes here
Router.get('/', controller.getAllEvents)
Router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.createEvent
)
Router.get('/:event_id', controller.getEventById)
// Router.get('/user/:user_id', controller.getEventByGuestId)
// Router.get('/host/:host_id', controller.getEventByHostId)
Router.put(
  '/:event_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateEvent
)
Router.delete(
  '/:event_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteEvent
)
Router.post('/:event_id/addUsers', controller.addGuestsToEvent)

module.exports = Router
