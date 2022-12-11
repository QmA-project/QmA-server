var express = require('express');
var router = express.Router();
var groupController = require('../controllers/groupController');

// 그룹 목록 조회
router.post('/', groupController.getGroupListByUserId);

// 그룹 친구 목록 조회
router.post('/friends', groupController.getGroupFriendListByGroupId);

module.exports = router;