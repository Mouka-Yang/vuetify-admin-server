module.exports = () => {
  const config = {};

  config.httpclient = {
    request: {
      enableProxy: true,
      rejectUnauthorized: false,
      proxy: 'http://127.0.0.1:12639',
    },
  };

  // disable csrf check in dev mode
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongo = {
    dbUrl: 'mongodb://localhost/egg-test-db',
    options: { useNewUrlParser: true },
  };
  return config;
};
