module.exports = (app) => {
  const { router, controller } = app;

  router.post('/auth/register', controller.auth.register);
  router.post('/auth/login', controller.auth.login);
  router.get('/auth/checkLogin', controller.auth.checkLogin);
  router.get('/auth/getCaptcha', controller.auth.getCaptcha);

  router.post('/user/logout', controller.user.logout);
  router.post('/user/resetPassword', controller.user.resetPassword);
  router.post('/user/changePassword', controller.user.changePassword);
  router.get('/user/info', controller.user.info);

  router.post('/audit/saveAuditItem', controller.audit.saveAuditItem);
  router.post('/audit/deleteAuditItem', controller.audit.deleteAuditItem);
  router.get('/audit/getAllAuditItems', controller.audit.getAllAuditItems);

  router.get('/ref/all', controller.ref.all);

  router.get('*', controller.static.index);
};
