'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async loginbyphone () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // console.log(payload);
    const userData = await service.user.loginbyphone(payload.phone);
    console.log(userData);
    const token = await service.token.creatToken(userData._id);
    console.log('token========>', token);
    if (userData === 1) {
      ctx.body = '账号不存在';
    } else {
      if (userData.password === payload.password) {
        ctx.body = { userData, token };
      } else {
        ctx.body = '密码有误';
      }
    }
  }// 以手机号登录

  async loginbyname () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // console.log(payload);
    const userData = await service.user.loginbyname(payload.name);
    console.log(userData);
    const token = await service.token.creatToken(userData._id);
    console.log('token========>', token);
    if (userData === 1) {
      ctx.body = '账号不存在';
    } else {
      if (userData.password === payload.password) {
        ctx.body = { userData, token };
      } else {
        ctx.body = '密码有误';
      }
    }
  }// 以用户名登录

  async show () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const uid = ctx.body.uinfo._id;
    const res = await service.user.show(uid);
    ctx.body = res;
  }// 查看个人信息

  async create () {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    console.log('res:', res);
    ctx.body = res;
  }// 注册

  async delete () {
    const { ctx, service } = this;
    const { name } = ctx.query;
    const res = await service.user.delete(name);
    ctx.body = res;
  }// 注销

  async update () {
    const { ctx, service } = this;
    // const { id } = ctx.query;
    const payload = ctx.request.body || {};
    const res = await service.user.update(payload);
    ctx.body = res;
  }// 更新用户信息

}

module.exports = UserController;
