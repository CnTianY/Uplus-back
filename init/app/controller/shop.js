'use strict';

const Controller = require('egg').Controller;

class ShopController extends Controller {

  async show () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.shop.show(uid);
    ctx.body = res;
  }

  async showForUserBySalesVolume () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.shop.showForUserBySalesVolume(uid);
    ctx.body = res;
  }

  async upload () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const uid = ctx.body.uinfo._id;
    console.log('uid===============>>', uid);
    const id = { user_id: uid };
    const res = await service.audit.upload(payload, id);
    console.log('res:', res);
    ctx.body = res;
  }// 开设店铺

  async delete () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    // const { name } = ctx.query;
    const res = await service.shop.delete(uid);
    ctx.body = res;
  }// 注销店铺

  async update () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const payload = ctx.request.body || {};
    // console.log('payload,uid===============>>', payload, uid);
    const res = await service.shop.update(payload, uid);
    ctx.body = res;
  }// 更新店铺信息

}

module.exports = ShopController;
