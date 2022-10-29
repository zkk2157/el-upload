const Koa = require('koa');
const cors = require('@koa/cors');
const {router} = require('./src/router/index.js')
const koaBody = require('koa-body')
const Path = require('path')

const server = new Koa();
server.use(cors());   //解决跨域问题


const fs = require('fs')
server.use(koaBody({         //上传文件
    multipart: true,
    encoding: 'utf-8',
    formidable: {
        uploadDir: Path.join(process.cwd() + '/GetuploadFiles'),  // 上传目录, 默认放置于启动程序的根目录
        keepExtensions: true, // 保持文件的后缀
        // maxFieldsSize: 10485760 // 默认文件大小10mb
    }
}))
server.use(router.routes()).use(router.allowedMethods());

server.listen(3000,'192.168.0.196',() => {
    console.log("服务器已启动!")
})