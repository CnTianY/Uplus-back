'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_GOODSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    num: { type: Number, required: true },
    pic: { type: String, required: true }, // 商品图片
    description: { type: String, required: true }, // 商品备注
    seller_id: { type: Schema.Types.ObjectID }, // 商铺id T_SELLER._id
  });

  return mongoose.model('T_GOOD', T_GOODSchema);

};
