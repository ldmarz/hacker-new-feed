// Modules
const compose = require('compose-middleware').compose;

// Middlewares
const response = require('../middlewares/response.middleware');

// Public Methods
const someFunction = compose([someFunction]);


function someFunction(req, res, next) {
  console.log('hola');
  next();
}