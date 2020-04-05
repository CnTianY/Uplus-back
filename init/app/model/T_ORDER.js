'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_ORDERSchema = new Schema({
    value: { type: Number, required: true },
    num: { type: Number, required: true },
    description: { type: String }, // 购买备注
    kind: { type: Array, required: true },
    time: { type: Date, required: true }, // 送货时间
    user_id: { type: Schema.Types.ObjectID }, // 交易双方id T_USER._id
  });

  return mongoose.model('T_ORDER', T_ORDERSchema);

};
