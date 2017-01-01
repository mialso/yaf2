'use strict'

let serve = require('koa-static')
let koa = require('koa')
let app = koa()
let port = 5999

console.log(__dirname)

app.use(serve(__dirname+'/app/'))

app.listen(port)
