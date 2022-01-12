const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, (req, res) => {
    Comment.findAll({
            attributes: ["id", "comment_content", "post_id", "user_id"],
            include: [{
                    model: Post,
                    attributes: ["id", "title", "post_content", "user_id"],
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
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// to find a single comment by id 

router.get('/:id', (req, res) => {
    Comment.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// .then((dbCommentData) => {
//     // to serialize comment data
//     if (!dbCommentData) {
//         res.status(404).json({ message: "No Comment available with this id" });
//         return;
//     }
//     const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
//     console.log(comments);
//     res.render("comments", { comments, loggedIn: req.session.loggedIn });
// })


//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// to add a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment_content: req.body.comment_content,
                post_id: req.body.post_id,
                //use the id from the session
                user_id: req.session.user_id,
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    }
});
router.delete('/', withAuth, (req, res) => {
    Comment.delete({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No Comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});
module.exports = router;