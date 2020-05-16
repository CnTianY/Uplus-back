'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

  async showBuyVisible (uid) {
    const { ctx } = this;
    const res = await ctx.model.Order.find({ bid: uid, visibility: 1 });
    return (ctx.body = res);
  }

  async showSellVisible (uid) {
    const { ctx } = this;
    const mid = await ctx.model.Shop.findById(uid);
    const res = await ctx.model.Order.find({ sid: mid._id, visibility: 1 });
    return (ctx.body = res);
  }

  async showBuyInvisible (uid) {
    const { ctx } = this;
    const res = await ctx.model.Order.find({ bid: uid, visibility: 0 });
    return (ctx.body = res);
  }

  async showSellInvisible (uid) {
    const { ctx } = this;
    const mid = await ctx.model.Shop.findById(uid);
    const res = await ctx.model.Order.find({ sid: mid._id, visibility: 0 });
    return (ctx.body = res);
  }

  async create (payload, uid) {
    const { ctx } = this;
    const decrease = await ctx.service.deal.decrease(payload, uid);
    const addSalesVolume = await ctx.service.deal.addSalesVolume(payload, uid);
    console.log(addSalesVolume);
    console.log('decrease===============>>', decrease);
    console.log(typeof (decrease));
    if (typeof (decrease) === 'string') {
      return (ctx.body = decrease);
    }
    const sid = { sid: decrease.shop_id };
    const bid = { bid: uid };
    const form = Object.assign({}, payload, sid, bid);
    console.log('form===============>>', form);
    const res = await ctx.model.Order.create(form);
    return (ctx.body = res);
  }

  async hide (oid) {
    const { ctx } = this;
    console.log(oid);
    if (oid) {
      try {
        const orderRes = await ctx.model.Order.findById(oid._id);
        console.log('orderRes===============>>', orderRes);
        if (orderRes) {
          const visibility = orderRes.visibility;
          if (visibility === true) {
            orderRes.visibility = 0;
            const res = await ctx.model.Order.findByIdAndUpdate(orderRes._id, orderRes, { new: true });
            console.log('已经隐藏', res);
            return (ctx.body = res);
          } else if (visibility === false) {
            console.log('订单已被隐藏');
            return (ctx.body = '订单已被隐藏');
          }
        }
        console.log('订单不存在');
        return (ctx.body = '订单不存在');
      } catch (error) {
        console.log('捕捉异常===============>>\n', error);
        return error;
      }
    } else {
      return '隐藏失败';
    }
  }

  async delete (oid) {
    const { ctx } = this;
    console.log(oid);
    if (oid) {
      try {
        const orderRes = await ctx.model.Order.findById(oid._id);
        console.log('orderRes===============>>', orderRes);
        if (orderRes) {
          const res = await ctx.model.Order.findByIdAndRemove(oid._id);
          console.log('已经删除', res);
          return (ctx.body = res);
        }
        console.log('订单不存在');
        return (ctx.body = '订单不存在');
      } catch (error) {
        console.log('捕捉异常===============>>\n', error);
        return error;
      }
    } else {
      return '删除失败';
    }
  }

  async update (payload) {
    const { ctx } = this;
    console.log(payload);
    const res = await ctx.model.Order.findByIdAndUpdate(payload._id, payload, { new: true });
    console.log(res);
    if (res === null) {
      ctx.body = '未找到商品';
    } else {
      ctx.body = res;
    }
    return ctx.body;
  }

}

module.exports = OrderService;
