const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const EventRouter = require('./EventRouter')
const ItemRouter = require('./ItemRouter')
Router.use('/users', UserRouter)
Router.use('/events', EventRouter)
Router.use('/items', ItemRouter)
module.exports = Router
