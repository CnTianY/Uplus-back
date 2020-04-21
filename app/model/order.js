'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_ORDERSchema = new Schema({
    gid: { type: Schema.Types.ObjectID, reg: 'Good' }, // 商品名称
    value: { type: Number, min: 0, required: true }, // 交易金额
    num: { type: Number, min: 0, required: true },
    description: { type: String }, // 购买备注
    kind: { type: Array, required: true },
    time: { type: Date, required: true }, // 送货时间
    add: { type: String, required: true }, // 送货地址
    visibility: { type: Boolean, required: true, default: 1 }, // 可见性 1为可见 0为隐藏
    sid: { type: Schema.Types.ObjectID, required: true, reg: 'User' }, // 卖家id
    bid: { type: Schema.Types.ObjectID, required: true, reg: 'User' }, // 买家id
  });

  return mongoose.model('Order', T_ORDERSchema, 'T_ORDER');

};
