'use strict';

const Service = require('egg').Service;

class ShopService extends Service {

  async show (uid) {
    const { ctx } = this;
    const res = await ctx.model.Shop.find({ user_id: uid });
    return (ctx.body = res);
  }

  async showForUserBySalesVolume () {
    const { ctx } = this;
    const mid = await ctx.model.Shop.find();

    function desc (payload) {
      return function (a, b) {
        const valueA = a[payload];
        const valueB = b[payload];
        return valueB - valueA;
      };
    }

    const res = mid.sort(desc('salesVolume'));
    console.log('res:', res);
    return (ctx.body = res);
  }

  async create (shopForm) {
    const { ctx } = this;
    const res = await ctx.model.Shop.create(shopForm);
    return (ctx.body = res);
  }

  async delete (uid) {
    const { ctx } = this;
    let res;
    console.log(uid);
    if (uid) {
      try {
        const idRes = await ctx.model.Shop.findOne({ user_id: uid });
        console.log(idRes);
        if (idRes) {
          res = await ctx.model.Shop.findByIdAndRemove({ _id: idRes._id });
          console.log('已经删除', res);
          return (ctx.body = res);
        }
        console.log('商铺不存在');
        return (ctx.body = '商铺不存在');
      } catch (error) {
        console.log('捕捉异常===============>>\n', error);
        return error;
      }
    } else {
      return '商铺信息不完确';
    }
  }

  async update (payload, uid) {
    const { ctx } = this;
    console.log(payload);
    const res = await ctx.model.Shop.findOneAndUpdate({ user_id: uid }, payload, { new: true });
    console.log(res);
    if (res === null) {
      ctx.body = '未找到店铺';
    } else {
      ctx.body = res;
    }
    return ctx.body;
  }

}

module.exports = ShopService;
