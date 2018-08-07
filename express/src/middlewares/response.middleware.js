const HttpStatus = require('http-status-codes');

module.exports = responseMiddleware;

function responseMiddleware(req, res) {
  var payload = res.payload || {};

  const status = payload.status || HttpStatus.OK;
  res.status(status).json({data: payload});
}
