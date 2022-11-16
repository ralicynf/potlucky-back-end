const Router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

Router.get('/', controller.getAllComments)
Router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createComment
)
Router.get('/:event_id', controller.getCommentsByEvent)
Router.put(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateComment
)
Router.delete(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteComment
)

module.exports = Router
