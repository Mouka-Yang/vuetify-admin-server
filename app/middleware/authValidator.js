// this middleware is used to validate if the authorization of the request if valid
// used for all accesses which need to be logged in

const jwt = require('jsonwebtoken');
const helper = require('../extend/helper');

module.exports = (options, app) => async function authValidatorMiddleware(ctx, next) {
  console.log(app.config.env)
  const authToken = helper.verifyToken(ctx.get('Authorization'));
  try {
    if (authToken) {
      // store current authenticated user to context
      ctx.userId = jwt.decode(authToken).userId;
      console.log('verify success');
      await next();
    } else {
      ctx.body = helper.returnError('please login first!');
    }
  } catch (error) {
    console.log(error);
    ctx.body = helper.returnError();
  }
};
