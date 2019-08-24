const { Controller } = require('egg');
const helper = require('../extend/helper');
const rule = require('../extend/rule');

class UserController extends Controller {
  // logout
  async logout() {
    console.log('logout');
    this.ctx.session = null;
    this.ctx.body = helper.returnOk();
  }

  // reset password
  async resetPassword() {
    console.log('reset');
    this.ctx.body = helper.returnError('Not implementd!');
  }

  // change password
  async changePassword() {
    try {
      this.ctx.validate(rule.changePassRule);
    } catch (error) {
      this.ctx.body = helper.returnValidationError(error);
      return;
    }
    const oldpass = helper.getSha256(this.ctx.request.body.oldpass);
    const newpass = helper.getSha256(this.ctx.request.body.newpass);

    try {
      const success = await this.service.user.changePassword(oldpass, newpass);
      if (success) {
        this.ctx.body = helper.returnOk('Change password success');
      } else {
        this.ctx.body = helper.returnError('Change password fail');
      }
    } catch (error) {
      this.ctx.body = helper.returnError();
    }
  }

  async info() {
    // get user info from db by user id
    try {
      const info = await this.service.user.getUserInfoDB(this.ctx.userId);
      if (info) {
        this.ctx.body = helper.returnOkWithData('ok', info);
      } else {
        this.ctx.body = helper.returnError('get user info failed');
      }
    } catch (error) {
      console.log(error.message);
      this.ctx.body = helper.returnError();
    }
  }
}

module.exports = UserController;
