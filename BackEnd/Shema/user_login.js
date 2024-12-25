const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLoginSchema = new Schema({
  u_id: { type: String, required: true, unique: true },
  u_name: { type: String, required: true },
  p_hash: { type: String, required: true },
  p_salt: { type: String, required: true },
  hash_algorithm_id: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const UserLogin = mongoose.model('user_login_detail', UserLoginSchema);
module.exports = UserLogin;
