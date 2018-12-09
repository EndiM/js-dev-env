import Koa from 'koa';
import path from 'path';
import open from 'open';
import Router from 'koa-router';
import serve from "koa-static";
import fs from 'fs';

const port = 3000;
const app = new Koa();
const router = new Router();

app.use(serve("dist", { gzip: true }));

router.get("/users", async (ctx) => {
  ctx.type = "application/json";
  ctx.body = [
    { "id": 1, "firstName": "Bertram", "lastName": "Gilfoyle", "email": "bertram.gilfoyle@outlook.com" },
    { "id": 2, "firstName": "Richard", "lastName": "Hendricks", "email": "richard.hendricks@outlook.com" },
    { "id": 3, "firstName": "Jared", "lastName": "Dunn", "email": "jared.dunn@outlook.com" },
    { "id": 4, "firstName": "Dinesh", "lastName": "Chugtai", "email": "dinesh.chugtai@outlook.com" }
  ]
})

router.get("*", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = fs.createReadStream(path.join(__dirname, "../dist/index.html"));
});

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
