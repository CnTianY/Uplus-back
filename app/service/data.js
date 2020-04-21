'use strict';

const Service = require('egg').Service;

class DataService extends Service {

  async show (uid) {
    const { ctx } = this;
    const res = await ctx.model.Data.find({ user_id: uid });
    return (ctx.body = res);
  }

  async create (payload, id) {
    const { ctx } = this;
    console.log('payload,id===============>>', payload, id);
    const form = Object.assign({}, payload, id);
    console.log('form===============>>', form);
    const res = await ctx.model.Data.create(form);
    return (ctx.body = res);
  }

  // async delete(uid) {
  //   const { ctx } = this;
  //   let res;
  //   console.log(uid);
  //   if (uid) {
  //     try {
  //       const idRes = await ctx.model.Shop.findOne({ user_id: uid });
  //       console.log(idRes);
  //       if (idRes) {
  //         res = await ctx.model.Shop.findByIdAndRemove({ _id: idRes._id });
  //         console.log('已经删除', res);
  //         return (ctx.body = res);
  //       }
  //       console.log('用户信息不存在');
  //       return (ctx.body = '用户信息不存在');
  //     } catch (error) {
  //       console.log('捕捉异常===============>>\n', error);
  //       return error;
  //     }
  //   } else {
  //     return '用户信息不完确';
  //   }
  // }

  async update (payload, uid) {
    const { ctx } = this;
    console.log(payload);
    const res = await ctx.model.Data.findOneAndUpdate({ user_id: uid }, payload, { new: true });
    console.log(res);
    if (res === null) {
      ctx.body = '未找到用户信息';
    } else {
      ctx.body = res;
    }
    return ctx.body;
  }

}

module.exports = DataService;
