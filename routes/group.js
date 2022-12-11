var express = require('express');
var router = express.Router();
var groupController = require('../controllers/groupController');

router.post('/', groupController.getGroupListByUserId);

module.exports = router;