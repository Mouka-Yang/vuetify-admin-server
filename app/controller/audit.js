const { Controller } = require('egg');
const helper = require('../extend/helper');
const rule = require('../extend/rule');
const logger = require('../extend/logger');

class AuditController extends Controller {
  async deleteAuditItem() {
    try {
      this.ctx.validate(rule.itemIdRule);
    } catch (error) {
      this.ctx.body = helper.returnValidationError(error);
      return;
    }

    try {
      const { itemId } = this.ctx.request.body;
      const success = await this.ctx.service.audit.deleteAuditItemDB(itemId);
      if (success) {
        this.ctx.body = helper.returnOk('Delete item success');
      } else {
        this.ctx.body = helper.returnError('Delete item fail');
      }
    } catch (error) {
      console.log(error.message);
      this.ctx.body = helper.returnError();
    }
  }

  async saveAuditItem() {
    try {
      this.ctx.validate(rule.auditItemRule);
      console.log('validate success');
    } catch (error) {
      this.ctx.body = helper.returnValidationError(error);
      return;
    }

    try {
      const { data: auditItem, create } = this.ctx.request.body;
      const success = await this.ctx.service.audit.saveAuditItemDB(
        auditItem, create,
      );
      if (success) {
        this.ctx.body = helper.returnOk('insert new item success');
      } else {
        this.ctx.body = helper.returnError('insert failed');
      }
    } catch (error) {
      console.log(error.message);
      this.ctx.body = helper.returnError();
    }
  }

  async getAllAuditItems() {
    try {
      const data = await this.ctx.service.audit.getAllAuditItemsDB();
      if (data) {
        this.ctx.body = helper.returnOkWithData('ok', data);
      } else {
        this.ctx.body = helper.returnError('get items failed');
      }
    } catch (error) {
      console.log(error.message);
      this.ctx.body = helper.returnError();
    }
  }
}

module.exports = AuditController;
