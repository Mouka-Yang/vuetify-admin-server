const moment = require('moment');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../config/config.default');


const helper = {
  // verify if auth token is valid
  verifyToken: (authToken) => {
    if (authToken) {
      const payload = authToken.replace('Bearer ', '').trim();
      try {
        // verify if token is valid (not expired)
        jwt.verify(
          payload,
          config.authValidator.authKey,
          config.authValidator.jwtVerifyOptions,
        );
        return payload;
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  // get relative time from unix time format
  relativeTime: (time) => moment(new Date(time * 1000)).fromNow(),

  // get sha256 hash from text string
  getSha256: (text) => {
    const hash = crypto.createHash('sha256');
    return hash.update(text).digest('hex');
  },

  // get YYYY-MM-DD like string from "Date" object
  dateToISOString: (date) => date.toISOString().substr(0, 10),

  // get successful return message with json format
  returnOk: (msg) => ({
    success: true,
    msg: msg || '',
  }),

  returnError: (error) => ({
    success: false,
    error,
  }),


  // sample error:
  // const a = {
  //   message: 'Validation Failed',
  //   code: 'invalid_param',
  //   errors: [{ message: 'should match /^[a-zA-Z0-9]{12}$/', code: 'invalid', field: 'itemId' }],
  // };
  returnValidationError: (error) => {
    let validationError = '';
    try {
      validationError = `Parameter ${error.errors[0].field} ${error.errors[0].code}`;
    } catch (err) {
      validationError = '';
    }
    return helper.returnError(validationError);
  },


  returnOkWithData: (msg, data) => ({
    success: true,
    data,
    msg,
  }),

  generateToken: (data) => jwt.sign(
    data,
    config.authValidator.authKey,
    config.authValidator.jwtGenerateOptions,
  ),

  getTokenValue: (token, key) => {
    // const payload = jwt.decode(token)[key]
    try {
      return jwt.decode(token)[key];
    } catch (error) {
      return '';
    }
  },
};

module.exports = helper;
