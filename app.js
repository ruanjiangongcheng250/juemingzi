const Koa = require('koa')
const init = require('./app/core/init')
const parser = require('koa-bodyparser');
const catchError = require('./middleware/catchError')

const app = new Koa()
app.use(catchError)
app.use(parser())
init.InitCore(app)
app.listen(8888)
console.log('****************程序启动***********************')