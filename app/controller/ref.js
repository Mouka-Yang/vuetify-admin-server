const { Controller } = require('egg');
const helper = require('../extend/helper');

class RefController extends Controller {
  async all() {
    const { ctx } = this;
    try {
      const data = await this.ctx.service.ref.getRefsDB();
      this.ctx.body = data ? helper.returnOkWithData('ok', data) : helper.returnError('get checklist failed');
    } catch (error) {
      console.log(error.message);
      this.ctx.body = helper.returnError();
    }
  }
}

module.exports = RefController;
