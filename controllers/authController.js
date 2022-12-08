const userModel = require("../models/authModel");

// 회원가입
async function createUser(req, res) {
    var post = req.body;
    var userInfo = [post.userSignId, post.userNickname, post.userPassword];
    var result = await userModel.insertUser(userInfo);
    if (!result)
        res.json({ "result": "FAIL" });
    else
        res.json({ "result": "SUCCESS" });
}

// 로그인
async function checkUserById(req, res) {
    var post = req.body;
    var result = await userModel.getUserById(post.userSignId);
    if (!result.length) // 아이디 여부 확인
        res.json({ "result": "FAIL" });
    else {
        if (result[0].user_password == post.password) // 비밀번호 확인
            res.json({ "result": "SUCCESS", "userId": result[0].signId, "userNickname": result[0].nickname });
        else
            res.json({ "result": "FAIL" });
    }

}

// 회원 정보 조회
async function getUserInfoById(req, res) {
    var post = req.body;
    var result = await userModel.getUserById(post.userSignId);
    if (!result.length) // 아이디 여부 확인
        res.json({ "result": "FAIL" });
    else
        res.json({ "result": "SUCCESS", "userId": result[0].signId, "userNickname": result[0].nickname, "userStatusMsg": result[0].statusMsg });
}

// 회원 정보 수정
async function updateUserInfo(req, res) {
    var post = req.body;
    var newUserInfo = [post.userNickname, post.userPassword, userStatusMsg, post.userSignId];
    var result = await userModel.updateUserInfoById(newUserInfo);
    if (!result)
        res.json({ "result": "FAIL" });
    else
        res.json({ "result": "SUCCESS" });
}

// 회원 탈퇴 시, 비밀번호 확인
async function getUserPasswordCorrect(req) {
    var post = req.body;
    var result = await userModel.getUserById(post.userSignId);
    if (result[0].password == post.userPassword)
        return true;
    else
        return false;
}

// 회원 탈퇴
async function deleteUser(req, res) {
    var post = req.body;
    var correctResult = await getUserPasswordCorrect(req);
    if (!correctResult) {
        res.json({ "result": "FAIL" });
    } else {
        var result = await userModel.deleteUserById(correctResult);
        if (!result)
            res.json({ "result": "FAIL" });
        else
            res.json({ "result": "SUCCESS" });
    }
}

module.exports = {
    createUser,
    checkUserById,
    getUserInfoById,
    updateUserInfo,
    getUserPasswordCorrect,
    deleteUser
}