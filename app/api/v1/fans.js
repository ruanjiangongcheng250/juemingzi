const Router = require('koa-router')

const { Auth } = require('../../../middleware/auth')
const { FansValidator, RemoveFansValidator } = require('../../validators/fansValidator')
const { Fans } = require('../../models/fans')

const router = new Router({
    prefix: '/v1/fans'
})
const {
    Success
} = require('../../core/http-exception')

router.post('/', new Auth().m, async (ctx, next)=>{
    const v = await new FansValidator(ctx).validate(ctx,{
        id: 'author_id'
    });
    await Fans.add(v.get('body.author_id'), ctx.auth.uid)
    throw new Success()
})

router.post('/cancel', new Auth().m, async (ctx, next)=>{
    const v = await new RemoveFansValidator(ctx).validate(ctx,{
        id: 'author_id'
    });
    await Fans.remove(v.get('body.author_id'), ctx.auth.uid)
    throw new Success()
})

module.exports = router