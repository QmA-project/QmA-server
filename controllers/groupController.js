const groupModel = require("../models/groupModel");

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

module.exports = {
    getGroupListByUserId
}