import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose';
import routing from './routes';
import { port, connexionString, credentials } from './config/default';
import path from 'path'
import render from 'koa-ejs'

mongoose.connect(connexionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error);

const app = new Koa();


// use as middle ware
app.use(bodyParser())

// for rendering in EJS
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

routing(app);

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


// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);

export default app;
