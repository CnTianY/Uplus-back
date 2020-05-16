'use strict';

const jwt = require('jwt-simple');
const Service = require('egg').Service;

class TokenService extends Service {

  async creatToken (_id) {
    console.log('Token is here!');
    return jwt.encode(
      {
        _id,
        iat: +new Date(),
        exp: +new Date() + 7 * 24 * 60 * 60 * 1000,
      },
      this.ctx.app.config.secret
    );
  }

}

module.exports = TokenService;
