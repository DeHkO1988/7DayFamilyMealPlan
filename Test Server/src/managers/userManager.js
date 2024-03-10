const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid password!');
    };

    let payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = await generateToken(payload);

    payload = { ...payload, token: token };

    return payload;

};

exports.register = async (userData) => {

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('Email already exists!');
    };

    const newUser = await User.create(userData);

    let payload = {
        _id: newUser._id,
        email: newUser.email,
        username: user.username
    }

    const token = await generateToken(newUser);

    payload = { ...payload, token: token };

    return payload;

};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};