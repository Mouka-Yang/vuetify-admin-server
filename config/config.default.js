const path = require('path');

// exports.keys = 'biubiubiu'
module.exports = {
  keys: 'biubiubiu',

  baseDir: 'C:\\Users\\jasonzyang\\Desktop\\web_test\\myApp\\myBackend',

  // middlewares config
  middleware: ['robot', 'authValidator', 'loginValidator'],

  robot: {
    ua: [
      /baiduspider/i,
      /alispider/i,
    ],
  },

  authValidator: {
    authKey: 'secret-key',
    jwtVerifyOptions: {
      issuer: 'mouka',
    },
    jwtGenerateOptions: {
      issuer: 'mouka',
      expiresIn: '1d',
    },

    match: ['/audit/*', '/user/'],
    // ignore: [
    //   '/auth',
    //   '/']
  },

  loginValidator: {
    match: '/auth/login',
  },

  // plugins config
  // mongodb
  mongoose: {
    client: {
      url: 'mongodb://localhost/egg-test-db',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,

      },
    },
  },

  historyApiFallback: {
    index: '/index.html',
  },

  // egg-session
  session: {
    key: 'SESSION_KEY',
    httpOnly: true,
  },

  // egg-static
  static: {
    prefix: '/',
    dir: 'C:\\Users\\jasonzyang\\Desktop\\web_test\\myApp\\myFront\\dist',
  },
};
