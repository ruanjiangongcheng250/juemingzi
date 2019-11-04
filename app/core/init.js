const Router = require('koa-router')
const requireDirectory = require('require-directory')
const exceptions = require('./http-exception')


class Init {
    static InitCore(app){
        Init.InitRouters(app)
        Init.loadConfig()
        Init.LoadException()
    }
    static InitRouters(app) {
        requireDirectory(module, `${process.cwd()}/app/api`, {
            visit: whenModuleLoad
        })

        function whenModuleLoad(obj) {
            if (obj instanceof Router) {
                app.use(obj.routes())
            }
        }
    }
    static loadConfig(path=''){
        const configPath = path || `${process.cwd()}/config/config`
        const config = require(configPath)
        global.config = config
    }

    static LoadException() {
        global.errs = exceptions
    }
}

module.exports = Init