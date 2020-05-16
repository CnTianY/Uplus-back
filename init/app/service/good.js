'use strict';

const Service = require('egg').Service;

class GoodService extends Service {

  async show (uid) {
    const { ctx } = this;
    const mid = await ctx.model.Shop.findOne({ user_id: uid });
    console.log('Mid:', mid);
    const res = await ctx.model.Good.find({ shop_id: mid._id });
    return (ctx.body = res);
  }

  async create (payload, uid) {
    const { ctx } = this;
    console.log('payload,id===============>>', payload, uid);
    const mid = await ctx.model.Shop.findOne({ user_id: uid });
    console.log('mid===============>>', mid);
    if (mid) {
      const sid = { shop_id: mid._id };
      const form = Object.assign({}, payload, sid);
      console.log('form===============>>', form);
      const res = await ctx.model.Good.create(form);
      return (ctx.body = res);
    }
    return (ctx.body = '此用户未开设商铺！');
  }


  async delete (gid) {
    const { ctx } = this;
    console.log(gid);
    if (gid) {
      try {
        const goodRes = await ctx.model.Good.findById(gid._id);
        console.log('goodRes===============>>', goodRes);
        if (goodRes) {
          const res = await ctx.model.Good.findByIdAndRemove(gid._id);
          console.log('已经删除', res);
          return (ctx.body = res);
        }
        console.log('商品不存在');
        return (ctx.body = '商品不存在');
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
    const res = await ctx.model.Good.findByIdAndUpdate(payload._id, payload, { new: true });
    console.log(res);
    if (res === null) {
      ctx.body = '未找到商品';
    } else {
      ctx.body = res;
    }
    return ctx.body;
  }

}

module.exports = GoodService;
