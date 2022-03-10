const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/new', withAuth, async(req, res) => {
    try {
        console.log(req.body);
        const comData = await Comment.create({...req.body
        });
        const comment = comData.get({ plain: true })
        console.log(comment);
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;