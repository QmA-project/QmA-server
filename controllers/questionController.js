const questionModel = require("../models/questionModel");

// 공개 질문 목록 조회
async function getPublicQuestionListByGroupId(req, res) {
    const PUBLIC_GROUP_ID = 1;
    var result = await questionModel.getQuestionListDataByGroupId(PUBLIC_GROUP_ID);
    if (!result)
        res.json({ "result": "FAIL" });
    else {
        var questions = JSON.parse(result);
        res.json({ "result": "SUCCESS", "questions": questions });
    }
}

// 질문 조회
async function getQuestionByQuestionId(req, res) {
    var questionId = req.params.questionId;
    var result = await questionModel.getQuestionDataByQuestionId(questionId);
    if (!result)
        res.json({ "result": "FAIL" });
    else {
        var questions = JSON.parse(result);
        res.json({ "result": "SUCCESS", "questions": questions });
    }
}

// 전체 그룹 질문 조회
async function getAllGroupQuestionListByUserId(req, res) {
    var post = req.body;
    var questionResult = await questionModel.getGroupQuestionListDataByUserId(post.userId);
    // TODO: groupId 따로 구해서 가져와야함...
    var groupResult = await questionModel.getGroupDataByGroupId(groupId);
    if (!questionsResult || !groupResult)
        res.json({ "result": "FAIL" });
    else {
        var group = JSON.parse(groupResult);
        var questions = JSON.parse(questionResult);
        res.json({ "result": "SUCCESS", group, "questions": questions });
    }
}

// 하나의 그룹에서 질문 목록 조회
async function getGroupQuestionListByGroupId(req, res) {
    var groupId = req.params.groupId;
    var groupResult = await questionModel.getQuestionListDataByGroupId(groupId);
    var questionResult = await questionModel.getGroupDataByGroupId(groupId);
    if (!questionsResult || !groupResult)
        res.json({ "result": "FAIL" });
    else {
        var group = JSON.parse(groupResult);
        var questions = JSON.parse(questionResult);
        res.json({ "result": "SUCCESS", group, "questions": questions });
    }
}

// 오늘의 질문 조회
async function getDailyQuestion(req, res) {
    var post = req.body;
    var result = await questionModel.getDailyQuestionData(post.todayDate);
    if (!result)
        res.json({ "result": "FAIL" });
    else {
        res.json({ "result": "SUCCESS", 'questionId': result[0].questionId, "content": result[0].content });
    }
}

// HOT 질문 조회
async function getDailyHotQuestion(req, res) {
    var post = req.body;
    var result = await questionModel.getDailyHotQuestionData(post.todayDate);
    if (!result)
        res.json({ "result": "FAIL" });
    else {
        res.json({ "result": "SUCCESS", 'questionId': result[0].questionId, "content": result[0].content, "createdAt": result[0].createdAt, "numOfAnswers": result[0].numOfAnswers });
    }
}

module.exports = {
    getPublicQuestionListByGroupId,
    getQuestionByQuestionId,
    getAllGroupQuestionListByUserId,
    getGroupQuestionListByGroupId,
    getDailyQuestion,
    getDailyHotQuestion
}