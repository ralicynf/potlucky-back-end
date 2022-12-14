const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const EventRouter = require('./EventRouter')
const ItemRouter = require('./ItemRouter')
const AuthRouter = require('./AuthRouter')
const CommentRouter = require('./CommentRouter')

Router.use('/users', UserRouter)
Router.use('/events', EventRouter)
Router.use('/items', ItemRouter)
Router.use('/auth', AuthRouter)
Router.use('/comments', CommentRouter)

module.exports = Router
