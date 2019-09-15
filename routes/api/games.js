const express = require('express');
const router = express.Router();

// @route GET api/games/test
// @description tests games route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'games route works' }));

module.exports = router;