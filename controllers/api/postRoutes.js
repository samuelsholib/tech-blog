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
    })
})







// Display create new artist page
router.get('/add', withAuth, async(req, res) => {
    res
        .status(200)
        .render('Artists/admin/add', { layout: 'admin' });
});

// router.post('/', async(req, res) => {
//     try {
//         const artistData = await Artist.create(req.body);
//         // res.status(200).json(artistData);
//         res.render('new-artist', { artist: artistData });

// Create a new artist
router.post('/add', withAuth, async(req, res) => {
    try {
        const artistData = await Artist.create(req.body);
        res
            .status(200)
            .json(artistData);
        // res.redirect(200,'/api/artists');
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

// Display edit Artist page
router.get('/edit/:id', withAuth, async(req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id, { raw: true });
        res
            .status(200)
            .render('Artists/admin/edit', { layout: 'admin', artist: artist });
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

//get route for all the Artists
router.get("/", async(req, res) => {
    Artist.findAll({
            attributes: ["id", "name"],
            include: [{
                model: Song,
                as: "songs",
                attributes: ["id", "name"],
            }, ],
        })
        .then((dbArtistData) => {
            res.json(dbArtistData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get a single Artist by  id
router.get("/:id", (req, res) => {
    Artist.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "name"],
            include: [{
                model: Song,
                as: "songs",
                attributes: ["id", "name"],
            }, ],
        })
        .then((dbArtistData) => {
            if (!dbArtistData) {
                res.status(404).json({ message: "No Artist found with this id" });
                return;
            }
            res.json(dbArtistData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post("/", (req, res) => {
    // to add a new Artist
    Artist.create({
            name: req.body.name,

        })
        .then((dbArtistData) => {
            res.json(dbArtistData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update Artist by id
router.put("/:id", (req, res) => {
    console.log("id", req.params.id);
    Artist.update({
            name: req.body.name,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbArtistData) => {
            if (!dbArtistData) {
                res.status(404).json({ message: "No Artist found with this id" });
                return;
            }
            res.json(dbArtistData);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

//to delete Artist by id
router.delete("/:id", (req, res) => {
    Artist.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbArtistData) => {
            if (!dbArtistData) {
                res.status(404).json({ message: "No Artist found with this id" });
                return;
            }
            res.json(dbArtistData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit an Artist
router.put('/edit/:id', withAuth, async(req, res) => {
    try {
        const artist = await Artist.update({
            name: req.body.name,
            imgur_url: req.body.imgur_url
        }, {
            where: {
                id: req.body.id
            }
        });
        req.session.message = `Artist "${req.body.name}" updated successfully.`;
        req.session.message_status = true;
        res
            .status(200)
            .render('Artists/admin/index', { layout: 'admin' });
    } catch (err) {
        res
            .status(500)
            .json(err);
    }

});

module.exports = router;