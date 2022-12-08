const pool = require('../modules/pool');

// 회원가입
async function insertUser(user) {
    const query = `INSERT INTO user (signId, nickname, password) VALUES (?, ?, ?)`;
    try {
        const result = await pool.queryParam(query, user);
        return result;
    } catch (error) {
        return null;
    }
}

// 아이디 여부 검사
async function getUserById(userId) {
    const query = `SELECT * FROM user WHERE signId=?`;
    try {
        const result = await pool.queryParam(query, userId).catch(
            function(error) {
                return null;
            });
        return result;
    } catch (error) {
        return null;
    }
}

// 회원 정보 수정
async function updateUserInfoById(newUserInfo) {
    const query = `UPDATE user SET nickname=?, password=?, statusMsg=? WHERE signId=?`;
    try {
        const result = await pool.queryParam(query, newUserInfo).catch(
            function(error) {
                return null;
            });
        return result;
    } catch (error) {
        return null;
    }
}

// 회원 탈퇴
async function deleteUserById(userId) {
    const query = `DELETE FROM user WHERE signId=?`;
    try {
        const result = await pool.queryParam(query, userId).catch(
            function(error) {
                return null;
            });
        return result;
    } catch (error) {
        return null;
    }
}

module.exports = {
    insertUser,
    getUserById,
    updateUserInfoById,
    deleteUserById
}