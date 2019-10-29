const Router = require('koa-router')
const requireDirectory = require('require-directory')


class Init {
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
}

module.exports = Init