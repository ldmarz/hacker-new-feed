'use strict';
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
require('./src/config/db.js');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index.js');
const errorHandler = require('./src/middlewares/errorHandler.middleware').errorHandler;

const app = express();
/** Initialize the server (express) */
function configureServer() {
  // Setup Logger
  switch (process.env.NODE_ENV) {
    case 'test':
    case 'prod':
      break;
    case 'development':
    default:
      app.use(morgan('dev'));
      break;
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  // Initialize routes
  routes(app);
  app.use(errorHandler);
};

function start() {
  app.listen(process.env.PORT, process.env.HOST, function() {
    console.log('%s \nServer started on %s:%d', Date(Date.now()), process.env.HOST, process.env.PORT);
  });
};

/** main **/
configureServer();
if (!module.parent) {
  start();
}

module.exports = app;
