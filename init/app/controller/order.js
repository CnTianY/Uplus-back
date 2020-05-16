'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {

  async showBuyVisible () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.order.showBuyVisible(uid);
    ctx.body = res;
  } // 查看未隐藏的购买订单

  async showSellVisible () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.order.showSellVisible(uid);
    ctx.body = res;
  }// 查看未隐藏售出订单

  async showBuyInvisible () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.order.showBuyInvisible(uid);
    ctx.body = res;
  } // 查看隐藏的购买订单

  async showSellInvisible () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.order.showSellInvisible(uid);
    ctx.body = res;
  }// 查看隐藏售出订单

  async create () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const uid = ctx.body.uinfo._id;
    console.log('uid===============>>', uid);
    const res = await service.order.create(payload, uid);
    ctx.body = res;
  }// 添加订单

  async hide () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const { oid } = ctx.query;
    const res = await service.order.hide(oid);
    ctx.body = res;
  }// 隐藏订单

  async delete () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const { oid } = ctx.query;
    const res = await service.order.delete(oid);
    ctx.body = res;
  }// 删除订单

  async update () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const res = await service.order.update(payload);
    ctx.body = res;
  }// 更新订单信息

}

module.exports = OrderController;
