const router = require('express').Router();

const apiRoutes = require('./api/comment-routes');
//const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', apiRoutes);
//router.use('/', homeRoutes);
router.use('/', dashboardRoutes);


router.use((req, res) => {
    res.status(400).end();
});
module.exports = router;