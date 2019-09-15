const express = require('express');
const router = express.Router();

// @route GET api/grids/test
// @description tests grids route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'grids route works' }));

module.exports = router;