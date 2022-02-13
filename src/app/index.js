const Koa = require("koa")
const bodyParser = require('koa-bodyparser')
const reigsterRouter = require('../router/register.router')

const app = new Koa()
app.use(bodyParser())
app.use(reigsterRouter.routes())
app.use(reigsterRouter.allowedMethods())

module.exports = app