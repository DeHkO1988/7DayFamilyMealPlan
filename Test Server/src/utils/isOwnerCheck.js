const tokenManager = require('../managers/tokenManager');

async function isOwnerCheck(userId, tokenId) {

    const token = await tokenManager.getOne(tokenId).lean();


    const result = token.owner._id == userId;

    return result

};

module.exports = isOwnerCheck; 