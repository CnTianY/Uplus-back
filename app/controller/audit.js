'use strict';

const Controller = require('egg').Controller;

class AuditController extends Controller {

  async showUnaudited () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const res = await service.audit.showUnaudited();
    ctx.body = res;
  }// 查看未审核的店铺

  async showAudited () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const res = await service.audit.showAudited();
    ctx.body = res;
  }// 查看已审核的店铺

  async upload () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    const uid = ctx.body.uinfo._id;
    console.log('uid===============>>', uid);
    const id = { user_id: uid };
    const res = await service.shop.create(payload, id);
    console.log('res===============>>', res);
    ctx.body = res;
  }// 申请店铺

  async audit () {
    const { ctx, service } = this;
    // console.log('ctx.body===============>>', ctx.body);
    const payload = ctx.request.body || {};
    if (payload.pass === 1) {
      const shopForm = await service.audit.auditPass(payload);
      console.log('shopForm===============>>', shopForm);
      const res = await service.shop.create(shopForm); // 审核通过自动创建Shop数据
      ctx.body = res;
    } else if (payload.pass === 0) {
      const res = await service.audit.auditFail(payload.auditid);
      console.log('res===============>>', res);
      ctx.body = res;
    }
  }// 审核是否通过

}

module.exports = AuditController;
