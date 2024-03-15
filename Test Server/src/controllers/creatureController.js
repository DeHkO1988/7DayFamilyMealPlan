const router = require('express').Router();
const creatureManager = require('../managers/tokenManager');
const { isAuth, auth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const isOwnerCheck = require('../utils/isOwnerCheck');

router.get('/create', (req, res) => {
    // console.log(req.user);
    // console.log(req.headers.cookie);
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {

    const { title, readyIn, ingredients, serves, image, description, owner, ownerUsername } = req.body;
    //const ownerId = req.user._id;

    try {

        //await creatureManager.create({ name, species, skinColor, eyeColor, image, description, owner: ownerId });
        await creatureManager.create({ title, readyIn, ingredients, serves, image, description, owner, ownerUsername });

        //res.redirect('/creatures/allCreatures');
        res.send({ status: "ok" })

    } catch (error) {

        //res.render('create', { error: getErrorMessage(error), name, species, skinColor, eyeColor, image, description });
        res.send({ error: getErrorMessage(error) });

    }
});

router.get('/allCreatures', async (req, res) => {

    const creatures = await creatureManager.getAll().lean();

    res.send(creatures);
});

router.get('/:creatureId/details', async (req, res) => {

    //const userId = req.user?._id

    const creatureId = req.params.creatureId;

    const creature = await creatureManager.getOne(creatureId).lean();

    //const isOwner = await isOwnerCheck(userId, creatureId);

    // let voters = [];

    // creature.votes.forEach(x => {
    //     voters.push(x.email);
    // });

    // const isUserVoted = voters.includes(req.user?.email);

    // const voterEmails = voters.join(', ')

    // res.render('details', { creature, isOwner, isUserVoted, voters, voterEmails });
    res.send(creature);
});

router.get('/:creatureId/delete', isAuth, async (req, res) => {

    const userId = JSON.parse(req.headers.owner);
    const creatureId = req.params.creatureId;
    const isOwner = await isOwnerCheck(userId, creatureId);

    //console.log(userId);
    // console.log(creatureId);

    if (isOwner) {

        await creatureManager.delete(creatureId);

        res.send({ status: "Ok" });

    } else {
        res.send({ error: "You are not the owner!!!" });
    }

});

router.get('/:creatureId/edit', isAuth, async (req, res) => {

    const userId = req.user._id;
    const creatureId = req.params.creatureId;
    const isOwner = await isOwnerCheck(userId, creatureId);
    const creature = await creatureManager.getOne(creatureId).lean();

    if (isOwner) {
        res.render('edit', { creature })
    } else {
        res.redirect('/users/logIn');
    }


});

router.post('/:creatureId/edit', isAuth, async (req, res) => {

    const userId = req.body.userId;
    const creatureId = req.params.creatureId;
    const isOwner = await isOwnerCheck(userId, creatureId);
    const newData = req.body;
    //const creature = await creatureManager.getOne(creatureId).lean();

    try {
        if (isOwner) {

            await creatureManager.update(creatureId, newData);

            res.send({status: "Ok, updated!"});

        } else {

            res.send({error: "You are not the owner"});

        }

    } catch (error) {
        res.send({error: getErrorMessage(error)});
    }


});

router.get('/:creatureId/vote', isAuth, async (req, res) => {

    const creatureId = req.params.creatureId;
    const userId = req.user._id;
    const isOwner = await isOwnerCheck(userId, creatureId);

    if (!isOwner) {

        await creatureManager.add(creatureId, userId);

        res.redirect(`/creatures/${creatureId}/details`);

    } else {

        res.redirect('/404');

    }

});








module.exports = router;