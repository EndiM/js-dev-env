import Koa from 'koa';
import path from 'path';
import open from 'open';
import Router from 'koa-router';
import fs from 'fs';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackMiddleware from 'webpack-koa2-middleware';
import webpackHotMiddleware from "koa-webpack-hot-middleware";
import logger from "koa-logger";
import convert from "koa-convert";

const port = 3000;
const app = new Koa();
const router = new Router();
const compiler = webpack(config);

app.use(logger());
app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(convert(webpackHotMiddleware(compiler)));

router.get("/users", async (ctx) => {
  ctx.type = "application/json";
  ctx.body = [
    { "id": 1, "firstName": "Bertram", "lastName": "Gilfoyle", "email": "bertram.gilfoyle@outlook.com" },
    { "id": 2, "firstName": "Richard", "lastName": "Hendricks", "email": "richard.hendricks@outlook.com" },
    { "id": 3, "firstName": "Jared", "lastName": "Dunn", "email": "jared.dunn@outlook.com" },
    { "id": 4, "firstName": "Dinesh", "lastName": "Chugtai", "email": "dinesh.chugtai@outlook.com" }
  ]
});

router.get("*", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = fs.createReadStream(path.join(__dirname, "../src/index.html"));
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, function (err) {
  if (err) {
    console.log(err); // eslint-disable-line
  }
  else {
    open(`http://localhost:${port}`)
  }
});

console.log(`listening on port ${port}`); // eslint-disable-line
