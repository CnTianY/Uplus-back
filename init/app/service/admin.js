'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  async login (name) {
    const { ctx } = this;
    console.log('name===============>>', name);
    const res = await ctx.model.Admin.findOne({ name });
    console.log(res);
    if (res) {
      ctx.body = res;
    } else {
      ctx.body = 1;
    }
    return ctx.body;
  }

  async show (aid) {
    const { ctx } = this;
    const res = await ctx.model.Admin.findById(aid);
    return (ctx.body = res);
  }

  async create (payload) {
    const { ctx } = this;
    if (payload.key === '^yWM^6VxBHiL7O8Bt)ZLx!cWThjPy9zy') {
      const resName = await ctx.model.Admin.findOne({ name: payload.name });
      if (resName) {
        return '已被注册';
      }
      const res = await ctx.model.Admin.create(payload);
      return (ctx.body = res);
    }
    return '密钥不正确';
  }

  async delete (name) {
    const { ctx } = this;
    let res;
    console.log(name);
    if (name) {
      try {
        res = await ctx.model.Admin.findOne({ name });
        console.log(res);
        if (res) {
          res = await ctx.model.Admin.findOneAndRemove({ name });
          console.log('已经删除', res);
          return (ctx.body = res);
        }
        console.log('用户不存在');
        return (ctx.body = '用户不存在');
      } catch (error) {
        console.log('捕捉异常：\n', error);
        return error;
      }
    } else {
      return '注销失败';
    }
  }

  async update (payload) {
    const { ctx } = this;
    console.log(payload);
    const res = await ctx.model.Admin.findOneAndUpdate({ name: payload.name }, payload, { new: true });
    console.log(res);
    return (ctx.body = res);
  }

}

module.exports = AdminService;
