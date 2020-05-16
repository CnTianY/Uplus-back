'use strict';

const Controller = require('egg').Controller;

class GoodController extends Controller {

  async show () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.good.show(uid);
    ctx.body = res;
  }

  async create () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const uid = ctx.body.uinfo._id;
    console.log('uid===============>>', uid);
    const res = await service.good.create(payload, uid);
    console.log('res:', res);
    ctx.body = res;
  }// 添加商品

  async delete () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const gid = ctx.query;
    const res = await service.good.delete(gid);
    ctx.body = res;
  }// 删除商品

  async update () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.good.update(payload);
    ctx.body = res;
  }// 更新商品信息

  async search () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.good.search(uid);
    ctx.body = res;
  }
}

module.exports = GoodController;
