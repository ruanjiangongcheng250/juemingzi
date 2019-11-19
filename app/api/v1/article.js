const Router = require('koa-router')
const {
    AddArticleValidator,
    DelArticleValidator,
    UpdateArticleValidator,
    QueryArticleByIdValidator
} = require('../../validators/articleValidator');
const {
    Success
} = require('../../core/http-exception')
const {
    Auth
} = require('../../../middleware/auth')
const {
    Article
} = require('../../models/article')

const router = new Router({
    prefix: '/v1/article'
})
router.post('/add', new Auth().m, async ctx => {
    const v = await new AddArticleValidator().validate(ctx)
    await Article.add(v, ctx)
    throw new Success()
})

router.delete('/delete', new Auth().m, async ctx => {
    const v = await new DelArticleValidator(ctx).validate(ctx)
    await Article.delete(v.get('body.article_id'))
    throw new Success()
})

router.put('/update/:article_id', new Auth().m, async ctx => {
    const v = await new UpdateArticleValidator(ctx).validate(ctx)
    await Article.update(v, ctx)
    throw new Success()
})

router.get('/queryAllArticle', async ctx => {
    const articles = await Article.getAll()
    ctx.body = {
        data: articles
    }
})

router.get('/queryArticleById',new Auth().m, async ctx => {
    const v = await new QueryArticleByIdValidator(ctx).validate(ctx)
    const result = await Article.queryArticleByid(v, ctx.auth.uid)
    ctx.body = {
        data: result
    }
})


module.exports = router