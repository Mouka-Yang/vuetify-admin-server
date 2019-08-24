const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');

class StaticController extends Controller {
  async index() {
    const { ctx, app } = this;
    const indexPath = path.join(app.config.static.dir, 'index.html');
    console.log(indexPath);
    ctx.body = await fs.readFileSync(indexPath, 'utf8');
  }
}

module.exports = StaticController;
