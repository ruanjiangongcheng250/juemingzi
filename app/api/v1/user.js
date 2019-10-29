const router = require('koa-router')({
    prefix: '/v1/user'
})

const { User } = require('../../models/user')

router.get('/user', async ctx=>{
    ctx.body = 'user'
})

router.get('/user1', async ctx=>{
    await User.create()
})

module.exports = router

