const { Service } = require('egg');
const helper = require('../extend/helper');

class AuthService extends Service {
  async register(username, password) {
    try {
      console.log(this.ctx.model.User);
      const newUser = new this.ctx.model.User({
        _id: this.app.mongoose.Types.ObjectId(),
        Username: username,
        Password: password,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async login(username, password) {
    // const res = await this.ctx.model.User.isValidUser(username, password)
    try {
      let userId = await this.ctx.model.User.find(
        { Username: username, Password: password },
        { _id: 1 },
      );
      userId = userId[0]._id;
      // if login success, reutrn the user id
      return userId;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthService;
