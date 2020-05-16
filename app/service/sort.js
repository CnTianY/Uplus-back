'use strict';

const Service = require('egg').Service;

class SortService extends Service {

  async asc (payload) {
    return function (a, b) {
      const valueA = a[payload];
      const valueB = b[payload];
      return valueB - valueA;
    };
  }
}

module.exports = SortService;
