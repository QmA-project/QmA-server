var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');

// 공개 질문 목록 조회
router.get('/questions', questionController.getPublicQuestionListByGroupId);

// 질문 조회
router.get('/questions/:questionId', questionController.getQuestionByQuestionId);

// 전체 그룹 질문 조회
router.post('/questions/group', questionController.getAllGroupQuestionListByUserId);

// 하나의 그룹에서 질문 목록 조회
router.get('/questions/group/:groupId', questionController.getGroupQuestionListByGroupId);

// 오늘의 질문 조회
router.post('/questions/today', questionController.getDailyQuestion);

// HOT 질문 조회
router.post('/questions/hot', questionController.getDailyHotQuestion);

module.exports = router;