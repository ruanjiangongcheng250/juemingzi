const Router = require('koa-router')
const {
    AddArticleValidator,
    DelArticleValidator,
    UpdateArticleValidator,
    QueryArticleByIdValidator,
    QueryAllArticleValidator,
    QueryPrivate,
    SearchValidator
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
const {
    User
} = require('../../models/user')

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
    const v = await new QueryAllArticleValidator().validate(ctx);
    const articles = await Article.getAll(v.get('query.start'), v.get('query.count'), false)
    ctx.body = {
        data: articles
    }
})

router.get('/queryPrivate', new Auth().m, async ctx=> {
    const v = await new QueryPrivate().validate(ctx)
    const articles = await Article.getAll(v.get('query.start'), v.get('query.count'), false, ctx.auth.uid, true)
    ctx.body = {
        data: articles
    }
})

router.get('/queryArticleById',new Auth().m, async ctx => {
    const v = await new QueryArticleByIdValidator(ctx).validate(ctx)
    const result = await Article.getArticleByid(v, ctx.auth.uid)
    ctx.body = {
        data: result
    }
})

router.get('/favor',new Auth().m, async ctx => {
    const v = await new QueryAllArticleValidator().validate(ctx)
    const result = await Article.getFavorArticles(v.get('query.start'), v.get('query.count'), ctx.auth.uid)
    ctx.body = {
        data: result
    }
})

router.get('/search', async ctx=> {
    const v = await new SearchValidator().validate(ctx)
    const articleList = await Article.search(v.get('query.keywords'), v.get('query.start'), v.get('query.count'))
    const relatedUserList = await User.search(v.get('query.keywords'), 0, 3)
    ctx.body = {
        article_data: articleList,
        related_user_data: relatedUserList
    }
})


module.exports = router