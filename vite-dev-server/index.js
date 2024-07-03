const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const aliasResolver = require('./aliasResolve')
const viteConfig = require('./vite.config')

app.use(async ctx => {
  // ctx.body = 'Hello World';
  if (ctx.request.url === '/') {
    const indexContent = await fs.readFileSync('./index.html', 'utf-8')
    ctx.body = indexContent;
  }
  if (ctx.request.url === '/main.js') {
    const mainJsContent = await fs.readFileSync('./main.js', 'utf-8')
    const realContent = aliasResolver(viteConfig.resolve.alias, mainJsContent)
    ctx.body = realContent;
    ctx.response.set('Content-Type', 'text/javascript')
    return;
  }
  if (ctx.request.url.endsWith('.js')) {
    const jsContent = await fs.readFileSync(`.${ctx.request.url}`, 'utf-8')
    ctx.body = jsContent;
    ctx.response.set('Content-Type', 'text/javascript')
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
})