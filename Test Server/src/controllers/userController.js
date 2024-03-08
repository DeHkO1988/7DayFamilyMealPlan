const router = require('express').Router();
const userManager = require('../managers/userManager');
const { auth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

// router.get('/login', (req, res) => {
//     res.render('login');
// });

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        // res.cookie('token', token);

        // res.redirect('/');

        res.send(token);

    } catch (err) {

        //res.render('login', { error: getErrorMessage(err) });

        res.send({ error: getErrorMessage(err) });

    }

})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {

    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {

        const token = await userManager.register({ firstName, lastName, email, password, repeatPassword });

        //res.cookie('token', token);

        //res.redirect('/');

        res.send(token);

    } catch (err) {

        res.send({ error: getErrorMessage(err) });

    }

});

router.get('/logout', auth, (req, res) => {

    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;  