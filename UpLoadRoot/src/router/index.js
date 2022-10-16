const Router = require('@koa/router');

const router = new Router();

const { uploadfiles } = require('../controller/uploadFiles.js');

router.post('/upload', uploadfiles);

module.exports = {
    router,
}