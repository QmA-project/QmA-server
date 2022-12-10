const pool = require('../modules/pool');

// 질문 목록 조회
async function getQuestionListDataByGroupId(groupId) {
    const query = 'SELECT * FROM question WHERE question.groupId=?;';
    try {
        const result = await pool.queryParam(query, groupId).catch(
            function(error) {
                console.log(error);
                return null;
            });
        var questionInfo = [];
        for (questionData of result) {
            var question = {};
            question.questionId = questionData.questionId;
            question.content = questionData.content;
            question.createdAt = questionData.createdAt;
            questionInfo.push(question);
        }
        // TODO: numOfAnswers 추가해야함
        questionInfo = JSON.stringify(questionInfo);
        return questionInfo;
    } catch (error) {
        return false;
    }
}

// 질문 조회
async function getQuestionDataByQuestionId(questionId) {
    const query = `SELECT * FROM question WHERE question.questionId=?;`;
    try {
        const result = await pool.queryParam(query, questionId).catch(
            function(error) {
                console.log(error);
                return null;
            });
        var questionInfo = [];
        for (questionData of result) {
            var question = {};
            question.questionId = questionData.questionId;
            question.content = questionData.content;
            question.createdAt = questionData.createdAt;
            question.userId = questionData.userId;
            question.userNickname = questionData.userNickname;
            question.isAnswerPrivate = questionData.isAnswerPrivate;
            questionInfo.push(question);
        }
        questionInfo = JSON.stringify(questionInfo);
        return questionInfo;
    } catch (error) {
        return false;
    }
}

// 전체 그룹 질문 조회
async function getGroupQuestionListDataByUserId(userId) {
    // TODO: 쿼리 짜기
    // userId를 통해 groupId의 목록들을 가져오고...groupId로 group table에서 각각 해당 groupId의 정보들을 가져오기 + question table에서 question 정보가져오기
    // userId로 groupId를 조회하는 함수를 따로 만드는 게 더 나은가?
    const query = `SELECT * FROM question WHERE question.groupId=groupId;`;
    try {
        const result = await pool.queryParam(query, userId).catch(
            function(error) {
                console.log(error);
                return null;
            });
        var questionInfo = [];
        for (questionData of result) {
            var question = {};
            question.questionId = questionData.questionId;
            question.content = questionData.content;
            question.createdAt = questionData.createdAt;
            question.push(question);
        }
        // TODO: numOfMembers, numOfAnswers 추가해야함
        questionInfo = JSON.stringify(questionInfo);
        return questionInfo;
    } catch (error) {
        return false;
    }
}

// userId로 groupId 목록 조회
async function getGroupIdDataByUserId(userId) {
    const query = `SELECT groupId FROM user_group WHERE userId=?`;
    try {
        const result = await pool.queryParam(query, todayDate).catch(
            function(error) {
                console.log(error);
                return null;
            });
        return result;
    } catch (error) {
        return false;
    }
}

// 그룹 정보 조회
async function getGroupDataByGroupId(groupId) {
    const query = `SELECT * FROM group WHERE group.groupId=?;`;
    try {
        const result = await pool.queryParam(query, groupId).catch(
            function(error) {
                console.log(error);
                return null;
            });
        var groupInfo = [];
        for (groupData of result) {
            var group = {};
            group.groupId = groupData.groupId;
            group.groupName = groupData.name;
            group.colorCode = groupData.colorCode;
            groupInfo.push(group);
        }
        // TODO: numOfMembers 추가해야함
        groupInfo = JSON.stringify(groupInfo);
        return groupInfo;
    } catch (error) {
        return false;
    }
}

// 오늘의 질문 조회
async function getDailyQuestionData(todayDate) {
    const todayDateWildStr = todayDate + '%';
    const query = `SELECT * FROM question WHERE createdAt LIKE ? AND isDaily=true;`;
    try {
        const result = await pool.queryParam(query, todayDateWildStr).catch(
            function(error) {
                console.log(error);
                return null;
            });
        return result;
    } catch (error) {
        return false;
    }
}

// HOT 질문 조회
async function getDailyHotQuestionData(todayDate) {
    // TODO: 쿼리 짜리
    // 오늘 작성된 질문 중 댓글 가장 많은 질문
    const query = `SELECT * FROM question WHERE createdAt.date=?`;
    try {
        const result = await pool.queryParam(query, todayDate).catch(
            function(error) {
                console.log(error);
                return null;
            });
        return result;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getQuestionListDataByGroupId,
    getQuestionDataByQuestionId,
    getGroupQuestionListDataByUserId,
    getGroupDataByGroupId,
    getDailyQuestionData,
    getDailyHotQuestionData
}