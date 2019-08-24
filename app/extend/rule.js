// define rules used to validate request parameters
module.exports = {
  loginRule: {
    captcha: { type: 'string', format: /[a-zA-Z0-9]{6}/ },
  },

  userRule: {
    username: { type: 'string', min: 6, max: 18 },
    password: { type: 'string', min: 6, max: 18 },
  },

  changePassRule: {
    oldpass: { type: 'string', min: 6, max: 18 },
    newpass: { type: 'string', min: 6, max: 18 },
  },

  itemIdRule: {
    itemId: { type: 'string', format: /^[a-zA-Z0-9]{24}$/ },
  },

  auditItemRule: {
    create: 'boolean',
    data: {
      type: 'object',
      rule: {
        domain: { type: 'url' },
        startDate: 'date',
        endDate: 'date',
        vulsNum: {
          type: 'object',
          rule: {
            high: { type: 'int', min: 0 },
            med: { type: 'int', min: 0 },
            low: { type: 'int', min: 0 },
          },
        },
        vulsDetail: {
          type: 'object',
          rule: {
            sqli: { type: 'string', allowEmpty: true },
            xss: { type: 'string', allowEmpty: true },
            upload: { type: 'string', allowEmpty: true },
            xxe: { type: 'string', allowEmpty: true },
            ssrf: { type: 'string', allowEmpty: true },
            cmdinject: { type: 'string', allowEmpty: true },
            csrf: { type: 'string', allowEmpty: true },
            urljump: { type: 'string', allowEmpty: true },
            auth: { type: 'string', allowEmpty: true },
            leakage: { type: 'string', allowEmpty: true },
            rce: { type: 'string', allowEmpty: true },
          },
        },
      },
    },
  },
};
