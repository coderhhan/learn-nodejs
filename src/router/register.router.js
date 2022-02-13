const KoaRouter = require('koa-router')

const reigsterRouter = new KoaRouter()

reigsterRouter.post('/register',(ctx)=>{
    const {name,password} = ctx.request.body
    console.log(ctx.request.body)
    ctx.body = '注册成功'
})

module.exports = reigsterRouter