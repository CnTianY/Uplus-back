'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const T_SELLERSchema = new Schema({
    bl: { type: String, required: true }, // 营业执照 Business License
    hl: { type: String, required: true }, // 卫生许可证 Sanitary Permit
    name: { type: String, required: true },
    principal: { type: String, required: true }, // 负责人
    id_num: { type: String, required: true }, // 身份证号
    con_info: { type: String, required: true }, // 联系方式 Contact_Information
    address: { type: String, required: true }, // 商铺地址
    sell_propho: { type: String, required: true }, // 商铺图片 Seller_Profile Photo
    description: { type: String, required: true }, // 商铺简介
    kind: { type: Array, required: true }, // 商铺类型
    user_id: { type: Schema.Types.ObjectID }, // 所有者id T_USER._id
  });

  return mongoose.model('T_SELLER', T_SELLERSchema);

};
