const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

// get route to findall of the posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "title", "post_content", "user_id"],
            include: [{
                    model: User,
                    attributes: ["id", "username", "email", "password"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_content", "post_id", "user_id"],
                },
            ],
        })
        .then((dbPostData) => {
            // to serialize data
            if (!dbPostData) {
                res.status(404).json({ message: "No Posts Available" });
                return;
            }
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            res.render("homepage", { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


router.get('/post/:id', (req, res) => {

    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "title", "post_content", "user_id"],
            include: [{
                    model: User,
                    attributes: ["id", "username", "email", "password"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_content", "post_id", "user_id"],
                    include: [{
                        model: User,
                        attributes: ["id", "username", "email", "password"],
                    }, ],
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No Post Found" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            // pass data to template
            res.render('singlePost', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;