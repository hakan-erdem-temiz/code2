import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  uid: Number,
  id: Number,
  name: String,
  email: String,
  password: String
})

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User')