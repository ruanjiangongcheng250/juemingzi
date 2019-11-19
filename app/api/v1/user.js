const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator');
const { Success } = require('../../core/http-exception')

const router = new Router({
    prefix: '/v1/user'
})
const { User } = require('../../models/user')
const { ArticleType } = require('../../models/article_type')

router.post('/register', async ctx=>{
    const v = await new RegisterValidator().validate(ctx)
    User.create({
        name: v.get('body.name'),
        email: v.get('body.email'),
        password: v.get('body.password1'),
        phone: v.get('body.phone')
    })
    throw new Success()
})

router.get('/', async ctx=>{
    ctx.body = 'this is test'
})


module.exports = router

