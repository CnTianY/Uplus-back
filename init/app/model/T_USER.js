'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_USERSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    id: { type: Boolean, required: true, default: 1 }, // 身份
  });

  return mongoose.model('T_USER', T_USERSchema);

};
