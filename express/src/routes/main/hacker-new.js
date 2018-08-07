const {Router} = require('express');
const router = Router();
const controller = require('../../controllers/hacker-new.controller.js');

router
  .get('/test', controller.someFunction);

module.exports = router;
