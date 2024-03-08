const util = require('util');
const jwt1 = require('njwt');
const jsonwebtoken = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const { error } = require('console');

const jwt = {
    sign: util.promisify(jsonwebtoken.sign),
    //verify: util.promisify(jsonwebtoken.verify),

};

module.exports = jwt;