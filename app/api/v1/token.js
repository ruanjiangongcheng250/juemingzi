const Router = require('koa-router')
const {
    TokenValidator,
    NotEmptyValidator
} = require('../../validators/validator')
const {
    LoginType
} = require('../../lib/enum');
const { User } = require('../../models/user')
const {
    generateToken
} = require('../../core/util')
const {
    Auth
} = require('../../../middleware/auth')
const {
    WXManager
} = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async ctx=>{debugger
    const v = await new TokenValidator().validate(ctx)
    let token
    switch(parseInt(v.get('body.type'))){
        case LoginType.USER_EMAIL:
        case LoginType.USER_NAME:
        case LoginType.USER_PHONE:
            token = await accountLogin(v.get('body.account'), v.get('body.password'))
            ctx.body = {
                token
            }
        break
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'));
            ctx.body = {
                token
            }
        break
    }

})

router.post('/verify', async ctx=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valid: result
    }
})

async function accountLogin(account, password) {
    const user = await User.verifyAccountPassword(account, password);
    return token = generateToken(user.id, Auth.USER)
}

module.exports = router

