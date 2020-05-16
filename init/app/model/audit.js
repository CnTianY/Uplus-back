'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AUDITSchema = new Schema({

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
    audited: { type: Boolean, required: true, defalut: 0 }, // 是否已被审核 1为已审核 0为未审核
    pass: { type: Boolean, required: true, default: 0 }, // 审核是否通过 1为通过 0为未通过
    user_id: { type: Schema.Types.ObjectID, unique: true, ref: 'User' }, // 所有者id User._id

  });

  return mongoose.model('Audit', AUDITSchema, 'T_AUDIT');

};
