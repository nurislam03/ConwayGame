const express = require('express');
const router = express.Router();

// @route GET grids/test
// @description tests grids route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'grids route works' }));

// @route POST api/grids
// @description creates grid
// @access Public
router.post('/grids', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Chek Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const value = req.body.email;

});



module.exports = router;