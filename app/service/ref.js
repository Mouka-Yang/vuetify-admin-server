const { Service } = require('egg');

class RefService extends Service {
  async getRefsDB() {
    const { ctx } = this;
    try {
      const res = await this.ctx.model.Checklist.find({});
      const refs = {};
      res.forEach((item) => {
        refs[item.type] = { methods: item.methods, results: item.results };
      });
      return refs;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
}

module.exports = RefService;
