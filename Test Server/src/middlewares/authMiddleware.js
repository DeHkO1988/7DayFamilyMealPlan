//const jwt = require('../lib/jwt');
const jwt = require('njwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    //const token = req.cookies['token'];
    const token = req.headers.token;

    if (token) {
        const decode = jwt.verify(token, SECRET, (err, verifiedToken) => {
            if (err) {
                res.statusCode = 401;

                res.sendStatus(res.statusCode);
            } else {
                next()
            }
        });

    } else {

        next();
    }

};

exports.isAuth = (req, res, next) => {

    const token = req.headers.token;

    const decode = jwt.verify(token, SECRET, (err, verifiedToken) => {
        if (err) {
            res.statusCode = 401;

            res.sendStatus(res.statusCode);
        } else {
            next() 
        }
    });

};