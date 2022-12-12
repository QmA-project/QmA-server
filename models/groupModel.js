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

// 그룹 친구 목록 조회
async function getGroupFriendListDataByGroupId(sendValue) {
    const query = "SELECT user.userId, user.nickname, user.profileImg, user.statusMsg FROM user LEFT OUTER JOIN user_group ON user_group.userId = user.userId WHERE user_group.groupId = ? AND user.userId != ? GROUP BY user.userId;";
    try {
        const result = await pool.queryParam(query, sendValue).catch(
            function (error) {
                return null;
            });
        var friendInfo = [];
        //get id and name
        for (friendData of result) {
            var friend = {};
            friend.userId = friendData.userId;
            friend.userNickname = friendData.name;
            friend.userProfileImg = friendData.profileImg;
            friend.userStatusMsg = friendData.statusMsg;
            friendInfo.push(friend);
        }
        friendInfo = JSON.stringify(friendInfo);
        return friendInfo;
    } catch(error) {
        return null;
    }
}

// 그룹 생성
async function insertGroup(sendValue) {
    const query = "INSERT INTO `group` (name, colorCode, statusMsg) VALUES (?, ?, ?)";
    try {
        const result = await pool.queryParam(query, sendValue);
        return result;
    } catch (error) {
        return null;
    }
}

// 그룹에 친구 추가
async function insertFrinedIntoGroup(sendValue) {
    const query = "INSERT INTO user_group (userId, groupId) VALUES (?, ?)";
    try {
        const result = await pool.queryParam(query, sendValue);
        return result;
    } catch (error) {
        return null;
    }
}


module.exports = {
    getGroupListDataByUserId,
    getGroupFriendListDataByGroupId,
    insertGroup,
    insertFrinedIntoGroup
}