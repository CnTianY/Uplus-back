'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async loginbyphone (phone) {
    const { ctx } = this;
    console.log('phone===============>>', phone);
    const res = await ctx.model.User.findOne({ phone });
    console.log(res);
    if (res) {
      ctx.body = res;
    } else {
      ctx.body = 1;
    }
    return ctx.body;
  }

  async loginbyname (name) {
    const { ctx } = this;
    console.log('name===============>>', name);
    const res = await ctx.model.User.findOne({ name });
    console.log(res);
    if (res) {
      ctx.body = res;
    } else {
      ctx.body = 1;
    }
    return ctx.body;
  }

  async show (uid) {
    const { ctx } = this;
    const res = await ctx.model.User.findById(uid);
    return (ctx.body = res);
  }

  async create (payload) {
    const { ctx } = this;
    const resName = await ctx.model.User.findOne({ name: payload.name });
    const resPhone = await ctx.model.User.findOne({ phone: payload.phone });
    if (resName && resPhone) {
      return '用户名和手机号均已被注册';
    } else if (resName) {
      return '用户名已被注册';
    } else if (resPhone) {
      return '手机号已被注册';
    }
    const res = await ctx.model.User.create(payload);
    return (ctx.body = res);
  }

  async delete (name) {
    const { ctx } = this;
    let res;
    console.log(name);
    if (name) {
      try {
        res = await ctx.model.User.findOne({ name });
        console.log(res);
        if (res) {
          res = await ctx.model.User.findOneAndRemove({ name });
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
    const res = await ctx.model.User.findOneAndUpdate({ name: payload.name }, payload, { new: true });
    console.log(res);
    return (ctx.body = res);
  }

}

module.exports = UserService;
