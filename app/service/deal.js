'use strict';

const Service = require('egg').Service;

class DealService extends Service {

  async decrease (payload, uid) {
    const { ctx } = this;
    const check = await ctx.model.Good.findById(payload.gid);
    if (check) {
      // console.log(check);
      if (check.user_id === uid) {
        return (ctx.body = '不能购买自家商品');
      }
      if (check.num - payload.num > 0) {
        check.num = check.num - payload.num;
        const res = await ctx.model.Good.findByIdAndUpdate(check._id, check, { new: true });
        return (ctx.body = res);
      }
      return (ctx.body = '商品库存不足');
    }
    return (ctx.body = '未找到该商品');
  }

}

module.exports = DealService;
