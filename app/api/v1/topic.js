const Router = require('koa-router')
const { Topic } = require('../../models/topic')

const router = new Router({
    prefix: '/v1/topic'
})
const {
    Success
} = require('../../core/http-exception')

router.get('/get', async (ctx, next)=>{
    const result = await Topic.getTopicList()
    ctx.body = {
        data: result
    }
})
module.exports = router