const express = require('express');
const router = express.Router();

// Load Input Validation
const validateGridInput = require('../validation/add-grid');

// Load Grid model
const Grid = require('../models/Grid');


// @route GET /grids/test
// @description tests grids route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'grids route works' }));

// @route POST /grids
// @description creates grid
// @access Public
router.post('/', (req, res) => {
    const { errors, isValid } = validateGridInput(req.body);

    // Chek Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newGrid = new Grid({
        x: req.body.x,
        y: req.body.y,
        data: req.body.data
    });

    newGrid.save()
    .then(grid => {
      res.status(201).json(grid);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});



module.exports = router;