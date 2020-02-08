import * as Koa from 'koa';
import * as cors from 'koa2-cors';
import * as KoaBody from 'koa-body';
import * as Static from 'koa-static';
import * as path from 'path';
import apiRouter from './routers/api';

const app = new Koa();
const HOST = '0.0.0.0';
const PORT = 3333;

app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 10 * 1024 * 1024 * 1024	// 设置上传文件大小最大限制 10 G
  }
}));

app.use(async (ctx, next) => {
  // 自定义中间件，设置跨域需要的响应头。
  ctx.set('Access-Control-Allow-Headers', "Content-Type,Access-Token,Cache-Control");
  ctx.set('Access-Control-Allow-Methods', '*');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
});

app.use(cors({
  origin: function (ctx) {
    return '*';
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 3000,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(Static(
  path.join(__dirname, './static')
))

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`);
});



