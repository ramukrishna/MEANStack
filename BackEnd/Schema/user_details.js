const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
  u_id: { type: String, required: true, unique: true },
  name: {
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    s_name: { type: String }
  },
  email: { type: String, required: true, unique: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  gender: { type: String, required: true },
  dofb: { type: Date, required: true },
  is_married: { type: Boolean, required: true },
  date: { type: Date, default: Date.now }
});

UserDetailSchema.index({ location: '2dsphere' });

const UserDetail = mongoose.model('user_detail', UserDetailSchema);
module.exports = UserDetail;
