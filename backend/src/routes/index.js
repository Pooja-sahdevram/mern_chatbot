const { Router } = require("express")
const {chatRoutes} = require("./chat-routes.js")
const {userRoutes} = require('./user-routes.js')
const appRoutes = Router()

appRoutes.use('/user', userRoutes);
appRoutes.use('/chat', chatRoutes)

module.exports = {
    appRoutes
}