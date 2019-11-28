const Router = require('koa-router')
const { RegisterValidator, GetAuthorValidator } = require('../../validators/userValidator');
const { Success } = require('../../core/http-exception')

const router = new Router({
    prefix: '/v1/user'
})
const { User } = require('../../models/user')
const { Article } = require('../../models/article')

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

router.get('/info', async ctx=>{
    const v = await new GetAuthorValidator().validate(ctx)
    const author_id = v.get('query.author_id')
    const author = await User.getUserById(author_id)
    ctx.body = {
        data: author
    }
})


router.get('/recommand', async ctx=>{
    const writerList = await User.getRecommandWriterList();
    ctx.body = {
        data: writerList
    }
})

router.get('/moreArticles', async ctx=>{
    const v = await new GetAuthorValidator().validate(ctx)
    const author_id = v.get('query.author_id')
    const start = v.get('query.start')
    const count = v.get('query.count')
    const list = await Article.getArticlesByAuthorId(author_id, start, count)
    ctx.body = {
        data: list
    }
})

router.get('/moreFans', async ctx=>{
    const v = await new GetAuthorValidator().validate(ctx)
    const author_id = v.get('query.author_id')
    const start = v.get('query.start')
    const count = v.get('query.count')
    const list = await User.getUserList(author_id,'fans', start, count)
    ctx.body = {
        data: list
    }
})

router.get('/moreFollows', async ctx=>{
    const v = await new GetAuthorValidator().validate(ctx)
    const author_id = v.get('query.author_id')
    const start = v.get('query.start')
    const count = v.get('query.count')
    const list = await User.getUserList(author_id,'follow', start, count)
    ctx.body = {
        data: list
    }
})


module.exports = router

