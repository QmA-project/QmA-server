const pool = require('../modules/pool');

// 그룹 목록 조회
async function getGroupListDataByUserId(userId) {
    const query = "SELECT g.groupId, g.name, g.colorCode, g.statusMsg, COUNT(*) AS numOfMembers FROM (SELECT * FROM `group` WHERE `group`.groupId IN (SELECT user_group.groupId FROM user_group WHERE user_group.userId=2))g INNER JOIN user_group ON g.groupId = user_group.groupId GROUP BY g.groupId;";
    try {
        const result = await pool.queryParam(query, userId).catch(
            function (error) {
                return null;
            });
        var groupInfo = [];
        //get id and name
        for (groupData of result) {
            var group = {};
            group.groupId = groupData.groupId;
            group.groupName = groupData.name;
            group.groupColorCode = groupData.colorCode;
            group.groupStatusMsg = groupData.statusMsg;
            group.numOfMemebers = groupData.numOfMembers;
            groupInfo.push(group);
        }
        groupInfo = JSON.stringify(groupInfo);
        return groupInfo;
    } catch(error) {
        return null;
    }
}

module.exports = {
    getGroupListDataByUserId
}