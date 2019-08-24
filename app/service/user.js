const { Service } = require('egg');
const helper = require('../extend/helper');

class UserService extends Service {
  async changePassword(oldpass, newpass) {
    console.log('Service: changePassword');
    try {
      // validate if the old password is right
      const res = await this.ctx.model.User.updateOne(
        {
          _id: this.app.mongoose.Types.ObjectId(this.ctx.userId),
          Password: oldpass,
        },
        { Password: newpass },
      );
      return res.nModified === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getUserInfoDB(userId) {
    console.log('Service: getUserInfo');
    try {
      const res = await this.ctx.model.User.findOne({
        _id: this.app.mongoose.Types.ObjectId(userId),
      });
      console.log(res);
      if (res) {
        const info = { username: res.Username };
        return info;
      }
      return undefined;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
}

module.exports = UserService;
