const { Router } = require('express');
const router = Router();
const controller = require('../../controllers/hacker-new.controller.js');

router
  .get('/list', controller.getList)
  .post('/deleteItem', controller.deleteItem);

module.exports = router;
