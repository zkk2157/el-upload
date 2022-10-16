async function uploadfiles(ctx) {


    // console.log(ctx.request.files);
    ctx.body = {
        success: true,
    }
}

module.exports = {
    uploadfiles,
}