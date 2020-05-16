'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async login () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // console.log(payload);
    const adminData = await service.admin.login(payload.name);
    console.log(adminData);
    const token = await service.token.creatToken(adminData._id);
    console.log('token========>', token);
    if (adminData === 1) {
      ctx.body = '账号不存在';
    } else {
      if (adminData.password === payload.password) {
        ctx.body = { adminData, token };
      } else {
        ctx.body = '密码有误';
      }
    }
  }

  async show () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const aid = ctx.body.uinfo._id;
    const res = await service.admin.show(aid);
    ctx.body = res;
  }// 查看管理员信息

  async create () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.admin.create(payload);
    console.log('res:', res);
    ctx.body = res;
  }// 注册

  async delete () {
    const { ctx, service } = this;
    const { name } = ctx.query;
    const res = await service.admin.delete(name);
    ctx.body = res;
  }// 注销

  async update () {
    const { ctx, service } = this;
    // const { id } = ctx.query;
    const payload = ctx.request.body || {};
    const res = await service.admin.update(payload);
    ctx.body = res;
  }// 更新用户信息

}

module.exports = AdminController;
