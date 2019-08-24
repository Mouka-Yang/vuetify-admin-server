const { Controller } = require('egg');
const svgCaptcha = require('svg-captcha');
const helper = require('../extend/helper');
const rule = require('../extend/rule');

class AuthController extends Controller {
  // register new user
  async register() {
    try {
      this.ctx.validate(rule.userRule);
    } catch (error) {
      this.ctx.body = helper.returnValidationError(error);
      return;
    }

    const { username } = this.ctx.request.body;
    const password = helper.getSha256(this.ctx.request.body.password);
    try {
      const error = await this.ctx.service.auth.register(username, password);
      if (!error) {
        this.ctx.body = helper.returnOk('register success');
      } else {
        let errorMsg = '';
        if ('code' in error && error.code === 11000) {
          errorMsg = 'Username already exists!';
        } else {
          errorMsg = 'Unknonw error';
        }
        this.ctx.body = helper.returnError(errorMsg);
      }
    } catch (error) {
      this.ctx.body = helper.returnError();
    }
  }

  // get captcha used to login
  async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 3,
      color: true,
    });

    this.ctx.set('Content-Type', 'image/svg+xml');
    this.ctx.body = captcha.data;
    this.ctx.session.captcha = captcha.text;
    this.ctx.status = 200;
  }

  // check if user already logged in before
  async checkLogin() {
    const authToken = this.ctx.get('Authorization');
    console.log(authToken);
    this.ctx.body = helper.verifyToken(authToken)
      ? helper.returnOk('success')
      : helper.returnError('not login');
  }

  // user login
  async login() {
    // parameter validating has been done by login middleware
    // no need to validate again

    const { username } = this.ctx.request.body;
    const password = helper.getSha256(this.ctx.request.body.password);
    try {
      const userId = await this.service.auth.login(username, password);
      if (userId) {
        const authToken = helper.generateToken({
          userId,
        });

        this.ctx.body = helper.returnOkWithData('login success', {
          token: authToken,
        });
      } else {
        this.ctx.body = helper.returnError(
          'login failed! username or password not right',
        );
      }
    } catch (error) {
      this.ctx.body = helper.returnError(error);
    }
  }
}

module.exports = AuthController;
