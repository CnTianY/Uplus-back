'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_DATASchema = new Schema({
    propho: { type: String, required: true }, // 头像 Profile Photo
    name: { type: String, required: true },
    gender: { type: Boolean },
    del_info: [{ // 收货信息 Delivery_Information
      name: String,
      gender: Boolean,
      phone: Number,
      address: String, // 收货地址
    }],
    user_id: { type: Schema.Types.ObjectID }, // 用户id T_USER._id
  });

  return mongoose.model('T_DATA', T_DATASchema);

};
