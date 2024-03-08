const Token = require('../models/Token');

exports.create = (tokenData) => Token.create(tokenData);

exports.getAll = () => Token.find();

exports.getOne = (tokenId) => Token.findById(tokenId).populate('owner').populate('votes');

exports.delete = (tokenId) => Token.findByIdAndDelete(tokenId);

exports.update = (tokenId, newData) => Token.findByIdAndUpdate(tokenId, newData, { runValidators: true });

exports.add = async (tokenId, userId) => {
    const token = await Token.findById(tokenId);

    if (!token.votes.includes(userId)) {
        token.votes.push(userId); //change tokenModel key name
    }

    return await token.save();
};

exports.myPosts = async (userId) => {
    const myPosts = await Token.find().populate('owner').lean();

    return myPosts;
}