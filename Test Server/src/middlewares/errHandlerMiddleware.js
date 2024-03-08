const { getErrorMessage } = require('../utils/errorHelpers');


exports.errHandler = (err, req, res) => {

    res.render('/404', { error: getErrorMessage(err) });
    
};