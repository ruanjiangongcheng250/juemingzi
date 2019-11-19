const Router = require('koa-router')

const { Auth } = require('../../../middleware/auth')
const { LikeValidator } = require('../../validators/articleValidator')
const { Like } = require('../../models/like')

const router = new Router({
    prefix: '/v1/like'
})
const {
    Success
} = require('../../core/http-exception')

router.post('/', new Auth().m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx,{
        id: 'art_id'
    });
    await Like.like(v.get('body.art_id'), ctx.auth.uid)
    throw new Success()
})

router.post('/cancel', new Auth().m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx,{
        id: 'art_id'
    });
    await Like.unlike(v.get('body.art_id'), ctx.auth.uid)
    throw new Success()
})

module.exports = router