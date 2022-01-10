const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// to get the users
router.get('/', (req, res) => {
    Post.findAll({
            attributes: ["id", "title", "post_content", "user_id"],
            include: [{
                    model: Comment,
                    attributes: ["id", "comment_content", "post_id", "user_id"],
                    include: {
                        model: User,
                        attributes: ["id", "username", "email", "password"],
                    }
                },
                {
                    model: User,
                    attributes: ["id", "username", "email", "password"],

                }
            ]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// to get a single post by id
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "title", "post_content", "user_id"],

            include: [{
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ["id", "username", "email", "password"],
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});
// create new post
router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id

        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update an existing post by id

router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// to delete a post by id 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;