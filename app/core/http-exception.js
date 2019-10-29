class HttpException extends Error {
    constructor(msg='服务器异常', errorCode=10000, statusCode=400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = statusCode
    }
}

module.exports = {
    HttpException
}