const Router = require('koa-router')

const { Auth } = require('../../../middleware/auth')
const { CommentValidator, getCommentValidator } = require('../../validators/articleValidator')
const { Comment } = require('../../models/comment')
const router = new Router({
    prefix: '/v1/comment'
})
const {
    Success
} = require('../../core/http-exception')

router.post('/add', new Auth().m, async (ctx, next)=>{
    const v = await new CommentValidator().validate(ctx,{
        id: 'art_id'
    });
    await Comment.add(v.get('body.art_id'),v.get('body.content'), ctx.auth.uid)
    throw new Success()
})

router.get('/query', async (ctx, next)=>{
    const v = await new getCommentValidator().validate(ctx,{
        id: 'art_id'
    });
    const result = await Comment.query(v.get('query.art_id'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})


module.exports = router