const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));


        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});
router.get('/dashboard/new', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });

        res.render('post-new', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }


});
router.get('/dashboard/edit/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        const post = postData.get({ plain: true });
        res.render('post-edit', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }


});


router.get('/post/:id', withAuth, async(req, res) => {
    try {

        const comData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: User }],
        });
        const com = comData.get({ plain: true });

        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true })

        const comUserData = await Comment.findAll({
            include: [{ model: User }],
            where: { post_id: req.params.id }
        });
        const allComments = comUserData.map(user => user.get({ plain: true }))
        res.render('post', {
            ...com,
            logged_in: req.session.logged_in,
            com_user_id: req.session.user_id,
            username: user.username,
            allComments


        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;