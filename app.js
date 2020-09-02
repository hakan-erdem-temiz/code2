// const Koa = require('koa');
// const KoaRouter = require('koa-router');

import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser'
import mongo from 'koa-mongo'

const port = 3670;
const app = new Koa();
const router = new KoaRouter();

// use as middle ware
app.use(bodyParser())
app.use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'koadb'
}))
router.post('/addUser', add);
router.get('/user', list);
router.put('/update', update);
router.delete('/delete', deleteData);

// Post User
async function add(ctx) {
  const uin = ctx.request.body
  await ctx.db.collection('userlist').insertOne(uin)
  ctx.body = 'Data Instered'
}

// Get User
async function  list(ctx) {
  ctx.body = await ctx.db.collection('userlist').find().toArray()
}

// Update User
async function update(ctx) {

  const uin = ctx.request.body;
  const user = await ctx.db.collection('userlist').findOneAndUpdate({
    'id': uin.id
  },
  {
    $set: {
      name: uin.name
    }
  },
  {upsert: true}
  )


  ctx.body = 'Data Updated'
}

async function deleteData(ctx) {
  const uin = ctx.request.body;
  await ctx.db.collection('userlist').findOneAndDelete({
    "id": uin.id
  })

  ctx.body = "Data deleted"
}


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



app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log('Server Running'));