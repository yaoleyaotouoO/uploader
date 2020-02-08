import * as Router from 'koa-router';
// import * as multiparty from 'multiparty';
import apiController from '../controllers/api';

const apiRouter = new Router({ prefix: '/api' });

apiRouter
    .post('/upload', async (ctx) => {
        console.log("upload entry!!");
        console.log("upload files: ", ctx.request.files);
        // const form = new multiparty.Form();
        // form.parse(ctx.req, function (err, fields, files) {
        //     var partIndex = fields.qqpartindex;
        //     console.log("fileds: ", fields);
        //     console.log("files: ", files);

        //     ctx.body = true;
        // });
        const file = ctx.request.files.qqfile;
        await apiController.upload(file);

        ctx.body = { success: true };
    })
    .delete('/delete', async ctx => {
        console.log("delete entry!!: ", ctx);

        ctx.body = { success: true };
    })
    .get('/test', async ctx => {
        console.log("nginx test");

        ctx.body = { success: true };
    })

export default apiRouter;