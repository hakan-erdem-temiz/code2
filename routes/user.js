// import 'babel-polyfill';
import User from '../model/User'
import Router from 'koa-router';

const router = new Router();


router.post('/addUser', add);
router.get('/user', list);
router.get('/', read);
router.put('/update', update);
router.delete('/delete', deleteData);


// Post User
async function add(ctx) {
  // TODO validate body
  const uin = ctx.request.body

  let user = new User();
  user.name = uin.name;
  user.id = uin.id;

  await user.save()

  ctx.body = 'Data Instered'
}

// Get User
async function list(ctx) {
  ctx.body = await User.find({})
}

async function read(ctx) {
  const data = await User.find({})
  await ctx.render('index', {
    title: 'User List',
    data
  })
}

// Update User
async function update(ctx) {

  const uin = ctx.request.body;
  const user = await User.findOneAndUpdate({
    id: uin.id
  }, {
      name: uin.name
  })


  ctx.body = 'Data Updated'
}

async function deleteData(ctx) {
  const uin = ctx.request.body;
  await User.findOneAndDelete({
    "id": uin.id
  })

  ctx.body = "Data deleted"
}

export default router;
