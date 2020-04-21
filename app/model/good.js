'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_GOODSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }, // 商品价值
    num: { type: Number, min: 0, required: true },
    pic: { type: String, required: true }, // 商品图片
    description: { type: String, required: true }, // 商品备注
    shop_id: { type: Schema.Types.ObjectID, ref: 'Shop' }, // 商铺id Shop._id
  });

  return mongoose.model('Good', T_GOODSchema, 'T_GOOD');

};
