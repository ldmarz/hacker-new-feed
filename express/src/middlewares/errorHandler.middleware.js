const HttpStatus = require('http-status-codes');

module.exports.errorHandler = errorHandler;

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== 'prod') {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({'error': 'Some unexpected error has ocurred.'});  
  }
};
