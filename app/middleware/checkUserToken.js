/* eslint-disable space-before-function-paren */
'use strict';

const jwt = require('jwt-simple');// npm install --save jwt-simple

module.exports = (option, app) => {
  console.log(option, app);
  return async function (ctx, next) {
    // console.log(ctx, next);
    // console.log(ctx.headers);
    if (!ctx.headers.token) {
      ctx.body = {
        msg: 'No token',
      };
    } else {
      // const token = ctx.headers.authorization.split(' ')[1];
      const token = ctx.headers.token;
      console.log('Token===============>>', token);
      try {
        const payload = jwt.decode(token, ctx.app.config.secret);
        console.log('DecodeToken===============>>', payload);
        const now = Math.floor(Date.now());
        console.log('Now===============>>', now);
        if (now > payload.exp) {
          ctx.body = {
            msg: 'token已过期',
          };
        } else {
          const res = await ctx.model.User.findById(payload._id);
          console.log('res===============>>', res);
          if (!res) {
            ctx.body = {
              msg: '身份错误',
            };
          } else {
            const uinfo = res;
            ctx.body = { uinfo };
            await next();
          }
        }
      } catch (e) {
        console.log(e);
        console.log('error===============>', '错误');
        ctx.body = {
          // msg: 'token错误',
          msg: '出现错误',
        };
      }
    }
  };
};
