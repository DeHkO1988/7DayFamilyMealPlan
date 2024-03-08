const mongoose = require ('mongoose');

const tokenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name length less then two chars']
    },
    species: {
        type: String,
        required: true,
        minLength: 3
    },
    skinColor: {
        type: String,
        required: true,
        minLength: 3
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: 3
    },
    image: {
        type: String,
        required: true,
        match: [/^https*:\/\//, 'he Crypto Image should start with http:// or https://.'],
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500,
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }

});

const Token = new mongoose.model('Token', tokenSchema);

module.exports = Token;