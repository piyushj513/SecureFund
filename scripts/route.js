const routes = require('next-routes')();

routes
  .add('/projects/:address', '/projects/show')
  .add('/projects/:address/payments', '/projects/payments/index')
  .add('/projects/:address/payments/new', '/projects/payments/new');

module.exports = routes;
