'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  const checkUserToken = app.middleware.checkUserToken();
  const checkAdminToken = app.middleware.checkAdminToken();

  router.get('/', controller.home.index);

  // 用户层
  router.get('/user/loginbyphone', controller.user.loginbyphone);
  router.get('/user/loginbyname', controller.user.loginbyname);
  router.get('/user/show', checkUserToken, controller.user.show);
  router.post('/user/create', controller.user.create);
  router.delete('/user/delete', controller.user.delete);
  router.put('/user/update', checkUserToken, controller.user.update);

  // 信息层
  router.get('/data/show', checkUserToken, controller.data.show);
  router.post('/data/create', checkUserToken, controller.data.create);
  router.delete('/data/delete', checkUserToken, controller.data.delete);
  router.put('/data/update', checkUserToken, controller.data.update);

  // 商铺层
  router.get('/shop/show', checkUserToken, controller.shop.show);
  router.get('/shop/showForUserBySalesVolume', checkUserToken, controller.shop.showForUserBySalesVolume);
  router.post('/shop/upload', checkUserToken, controller.shop.upload);
  router.delete('/shop/delete', checkUserToken, controller.shop.delete);
  router.put('/shop/update', checkUserToken, controller.shop.update);

  // 商品层
  router.get('/good/show', checkUserToken, controller.good.show);
  router.get('/good/show', checkUserToken, controller.good.search);
  router.post('/good/create', checkUserToken, controller.good.create);
  router.delete('/good/delete', checkUserToken, controller.good.delete);
  router.put('/good/update', checkUserToken, controller.good.update);

  // 订单层
  router.get('/order/showbuyvisible', checkUserToken, controller.order.showBuyVisible);
  router.get('/order/showsellvisible', checkUserToken, controller.order.showSellVisible);
  router.get('/order/showbuyinvisible', checkUserToken, controller.order.showBuyInvisible);
  router.get('/order/showsellinvisible', checkUserToken, controller.order.showSellInvisible);
  router.post('/order/create', checkUserToken, controller.order.create);
  router.put('/order/hide', checkUserToken, controller.order.hide);
  router.delete('/order/delete', checkUserToken, controller.order.delete);
  router.put('/order/update', checkUserToken, controller.order.update);

  // 管理层
  router.get('/admin/login', controller.admin.login);
  router.get('/admin/show', checkAdminToken, controller.admin.show);
  router.post('/admin/create', controller.admin.create);
  router.delete('/admin/delete', controller.admin.delete);
  router.put('/admin/update', checkAdminToken, controller.admin.update);

  // 审核层
  router.put('/audit/audit', checkAdminToken, controller.audit.audit);
};
