const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// findAll  to get all of the posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'post_content'],
            include: [{
                    model: User,
                    attributes: ['username', 'email', 'password']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username', 'email', 'password']
                    }
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get route to update a single post by id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'post_content'],
            include: [{
                    model: User,
                    attributes: ['username', 'email', 'password']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            // pass to the template
            res.render('edit-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;