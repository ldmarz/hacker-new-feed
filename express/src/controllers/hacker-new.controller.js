// Modules
const compose = require('compose-middleware').compose;

// Middlewares
const response = require('../middlewares/response.middleware');

// Public Methods
module.exports.someFunction = compose([someFunction, response]);

function someFunction(req, res, next) {
  res.payload = {hola: 'mundo'};
  next();
}
