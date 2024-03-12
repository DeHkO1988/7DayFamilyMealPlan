const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'Name length less then two chars']
    },
    readyIn: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
        required: true,
        minLength: 3
    },
    serves: {
        type: Number,
        required: true,
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
        maxLength: 1500,
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    likes: [{
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