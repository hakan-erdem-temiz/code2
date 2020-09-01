// const Koa = require('koa');
// const KoaRouter = require('koa-router');

import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser'

const port = 3670;
const app = new Koa();
const router = new KoaRouter();

// use as middle ware
app.use(bodyParser())


// Error Handling Middleware
app.use(async (ctx, next)=> {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = `Eror Body: ${err.message}`
    console.log('Error message:', err.message)
  }
})

const data = [{
    "id": 1,
    "name": "John"
  },
  {
    "id": 2,
    "name": "Alis"
  }
]

router.get('/', read);
router.post('/add', add)
router.put('/update', update)
router.delete('/delete', deletedata);

async function read(ctx) {
  ctx.body = data
}

async function add(ctx) {
  const uin = ctx.request.body;
  data.push(uin)
  ctx.body = "Data Added"
}

async function update(ctx) {
  const uin = ctx.request.body;
  const index = data.findIndex(e => e.id === uin.id)
  let message;
  if (index === -1) {
    data.push(uin)
    message = "data Added"
  } else {
    data[index] = uin;
    message = 'data Updated';
  }

  ctx.body = message
}

async function deletedata(ctx) {
  const uin = ctx.request.body;
  const index = data.findIndex((e) => e.id === uin.id);
  let message;
  if (index === -1) {
    message = 'Data Not Found';
  } else {
    delete data[index];
    message = 'data Deleted';
  }

  ctx.body = message;
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log('Server Running'));