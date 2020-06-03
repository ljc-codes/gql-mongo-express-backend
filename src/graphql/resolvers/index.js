const authResolver    = require('./auth');
const companyResolver = require('./company');
const thesisResolver  = require('./thesis');

const rootResolver = {
  ...authResolver,
  ...companyResolver,
  ...thesisResolver
};

module.exports = rootResolver;
