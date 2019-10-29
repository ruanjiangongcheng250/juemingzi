const { HttpException } = require('../app/core/http-exception')
const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        const isHttpExcetion = error instanceof HttpException
        if(!isHttpExcetion){
            const body = {
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`,
                msg: error.message
            }
            ctx.body = body;
            ctx.status = 500;
            console.error('!HttpException:' + JSON.stringify(body))
        }else{
            const body = {
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,
                msg: error.msg
            }
            ctx.body = body
            ctx.status = error.code
            console.error('HttpException:' + JSON.stringify(body))
        }
    }
}

module.exports = catchError