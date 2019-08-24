const { Service } = require('egg');
const helper = require('../extend/helper');

class AuditService extends Service {
  async deleteAuditItemDB(itemID) {
    try {
      const res = await this.ctx.model.Audit.deleteOne({
        _id: this.app.mongoose.Types.ObjectId(itemID),
      });
      console.log(res, itemID);
      return res.deletedCount === 1;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async saveAuditItemDB(auditItem, create) {
    try {
      const newAuditItem = new this.ctx.model.Audit({
        _id: auditItem._id || this.app.mongoose.Types.ObjectId(),
        UserId: this.ctx.userId,
        Domain: auditItem.domain,
        StartDate: auditItem.startDate,
        EndDate: auditItem.endDate,
        VulsNum: auditItem.vulsNum,
        VulsDetail: auditItem.vulsDetail,
      });
      if (!create) {
        newAuditItem.isNew = false;
      }
      await newAuditItem.save();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async getAllAuditItemsDB() {
    try {
      const data = await this.ctx.model.Audit.find({});
      // console.log(data);
      if (data) {
        const auditItems = [];
        data.forEach((item) => {
          auditItems.push({
            _id: item._id,
            vulsNum: item.VulsNum,
            vulsDetail: item.VulsDetail,
            domain: item.Domain,
            startDate: helper.dateToISOString(item.StartDate),
            endDate: helper.dateToISOString(item.EndDate),
            userId: item.UserId,
          });
        });
        // console.log(auditItems);
        return auditItems;
      }
      return undefined;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
}

module.exports = AuditService;
