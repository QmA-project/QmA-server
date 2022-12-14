var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

// 회원가입
router.post('/auth/signup',authController.createUser);

// 로그인
router.post('/auth/signin', authController.checkUserById);

// 회원 정보 조회
router.post('/auth/user', authController.getUserInfoById);

// 회원 정보 수정
router.post('/auth/user/update', authController.updateUserInfo);

// 회원 탈퇴
router.post('/auth/user/delete', authController.deleteUser);

module.exports = router;