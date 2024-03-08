const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const creatureManager = require('../managers/tokenManager');


router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {

    const userId = req.user._id;

    const myPosts = await creatureManager.myPosts(userId);

    const result = myPosts.filter(x => x.owner._id == userId);

    res.render('profile', { result });
})


router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;