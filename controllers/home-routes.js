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

//get route to find a post by id
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "title", "post_content", "user_id"],
            include: [{
                    model: User,

                    attributes: ["id", "username", "email", "password"],
                },
                {
                    model: Comment,
                    as: "comment",
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
                res.status(404).json({ message: "No Post found" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);

            const usersPost = post.user_id == req.session.user_id;
            res.render("single-post", {
                post,
                loggedIn: req.session.loggedIn,
                currentUser: usersPost,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// //get route for login page
router.get("/login", (req, res) => {
    console.log("Is logged in?", req.session.loggedIn);
    res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard", (req, res) => {

    // findAll Post
    console.log(req.session.user_id, " this is the session id");
    Post.findAll({
            where: {
                user_id: req.session.user_id,
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
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // get route to  create a new post
router.get("/post", (req, res) => {
    res.render("create-post", { loggedIn: req.session.loggedIn });
});

router.get("/edit/:id", (req, res) => {
    //    post_id: req.postID,
    res.render("edit-post", {
        loggedIn: req.session.loggedIn,
        post_id: req.params.id,
    });
});

module.exports = router;