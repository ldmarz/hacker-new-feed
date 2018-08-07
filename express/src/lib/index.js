const HttpError = require('http-custom-errors');

module.exports.notFoundError = notFoundError;
module.exports.badRequestError = badRequestError;
module.exports.notImplementedError = notImplementedError;
module.exports.serverError = serverError;

function notFoundError(message) {
  return new HttpError.NotFoundError(message);
}

function badRequestError(message) {
  return new HttpError.BadRequestError(message);
}

function notImplementedError(message) {
  return new HttpError.NotImplementedError(message);
}

function serverError(message) {
  return new HttpError.InternalServerError(message);
}
