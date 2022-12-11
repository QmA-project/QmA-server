const groupModel = require("../models/groupModel");

// 그룹 목록 조회
async function getGroupListByUserId(req, res){
    var post = req.body;
    var result = await groupModel.getGroupListDataByUserId(post.userId);
    if (!result)
        res.json({"result": "FAIL"});
    else {
        var groups = JSON.parse(result);
        res.json({"result": "SUCCESS", "groups": groups});
    }
}

// 그룹 친구 목록 조회
async function getGroupFriendListByGroupId(req, res){
    var post = req.body;
    var sendValue = [post.groupId, post.userId];
    var result = await groupModel.getGroupFriendListDataByGroupId(sendValue);
    if (!result)
        res.json({"result": "FAIL"});
    else {
        var friends = JSON.parse(result);
        res.json({"result": "SUCCESS", "friends": friends});
    }
}

module.exports = {
    getGroupListByUserId,
    getGroupFriendListByGroupId
}