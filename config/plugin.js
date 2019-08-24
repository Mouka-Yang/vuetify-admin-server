module.exports = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  historyApiFallback: {
    enable: true,
    package: 'egg-history-api-fallback'
  }
};
