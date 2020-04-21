'use strict';

const Controller = require('egg').Controller;

class DataController extends Controller {

  async show () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.data.show(uid);
    ctx.body = res;
  }

  async create () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const uid = ctx.body.uinfo._id;
    console.log('uid===============>>', uid);
    const id = { user_id: uid };
    const res = await service.data.create(payload, id);
    console.log('res:', res);
    ctx.body = res;
  }// 添加个人信息

  // async delete() {
  //   const { ctx, service } = this;
  //   // console.log('ctx.body===============>>', ctx.body);
  //   const uid = ctx.body.uinfo._id;
  //   // const { name } = ctx.query;
  //   const res = await service.data.delete(uid);
  //   ctx.body = res;
  // }// 删除个人信息

  async update () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const payload = ctx.request.body || {};
    // console.log('payload,uid===============>>', payload, uid);
    const res = await service.data.update(payload, uid);
    ctx.body = res;
  }// 更新店铺信息

}

module.exports = DataController;
