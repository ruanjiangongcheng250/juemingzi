const Koa = require('koa')
const init = require('./app/core/init')
const catchError = require('./middleware/catchError')

const app = new Koa()
app.use(catchError)
init.InitRouters(app)
app.listen(8888)
console.log('****************程序启动***********************')