
'use strict';

const Service = require('egg').Service;

class ShopService extends Service {

  async showUnaudited () {
    const { ctx } = this;
    const res = await ctx.model.Audit.findOne({ audited: 0 });
    return (ctx.body = res);
  }

  async showAudited () {
    const { ctx } = this;
    const res = await ctx.model.Audit.findOne({ audited: 1 });
    return (ctx.body = res);
  }

  async upload (payload, id) {
    const { ctx } = this;
    console.log('payload,id===============>>', payload, id);
    const form = Object.assign({}, payload, id);
    const res = await ctx.model.Audit.create(form);
    return (ctx.body = res);
  }

  async auditPass (payload) {
    const { ctx } = this;
    console.log('payload===============>>', payload);
    const mid = await ctx.model.Audit.findById(payload.auditid);
    mid.audited = 1;
    mid.pass = 1;
    const midToUpdate = await ctx.model.Good.findByIdAndUpdate(mid._id, mid, { new: true });
    console.log(midToUpdate, '已通过审核');
    const res =
      (({ kind, bl, hl, name, principal, id_num, con_info, address, sell_propho, description, user_id }) =>
        ({ kind, bl, hl, name, principal, id_num, con_info, address, sell_propho, description, user_id }))(mid);
    return (ctx.body = res);
  }

  async auditFail (payload) {
    const { ctx } = this;
    console.log('payload===============>>', payload);
    const res = await ctx.model.Audit.findById(payload);
    res.audited = 1;
    return (ctx.body = '审核未通过' + res);
  }

  // async delete (uid) {
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
  //       console.log('商铺不存在');
  //       return (ctx.body = '商铺不存在');
  //     } catch (error) {
  //       console.log('捕捉异常===============>>\n', error);
  //       return error;
  //     }
  //   } else {
  //     return '商铺信息不完确';
  //   }
  // }

  // async update (payload, uid) {
  //   const { ctx } = this;
  //   console.log(payload);
  //   const res = await ctx.model.Shop.findOneAndUpdate({ user_id: uid }, payload, { new: true });
  //   console.log(res);
  //   if (res === null) {
  //     ctx.body = '未找到店铺';
  //   } else {
  //     ctx.body = res;
  //   }
  //   return ctx.body;
  // }

}

module.exports = ShopService;
