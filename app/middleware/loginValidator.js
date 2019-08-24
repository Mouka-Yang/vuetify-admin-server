// this middleware is used to validate the login request is valid
// 1. not login replay
// 2. not brute-force
// 3. verify captcha

const helper = require('../extend/helper');
const rule = require('../extend/rule');

module.exports = (options, app) => async function loginValidatorMiddleware(ctx, next) {
  console.log('login middleware');
  try {
    ctx.validate(rule.loginRule);
    ctx.validate(rule.userRule);
  } catch (error) {
    ctx.body = helper.returnValidationError(error);
    return;
  }

  let isValid = false;
  const { captcha } = ctx.request.body;
  try {
    if (
      ctx.session.captcha
        && captcha.toUpperCase() === ctx.session.captcha.toUpperCase()
    ) {
      isValid = true;
    }
  } catch (error) {
    console.log(error);
  }

  // whatever delete the captcha from session
  delete ctx.session.captcha;

  if (isValid) {
    await next();
  } else {
    ctx.body = helper.returnError('captcha is not right');
  }
};
