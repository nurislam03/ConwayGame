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
      res.status(400).json({ errors: 'unable to save to database' });
    });
});

// @route patch /grids/:id
// @description update grid
// @access Public
router.patch('/:id', (req, res) => {
    const { errors, isValid } = validateGridInput(req.body);

    // Chek Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Grid.findByIdAndUpdate(req.params.id, req.body)
    .then(grid => {
        res.status(202).json({ msg: 'Updated successfully' })
    })
    .catch(err => {
        res.status(400).json({ errors: 'Unable to update the Database' })
    });
});

// @route patch /grids/:id
// @description get grid
// @access Public
router.get('/:id', (req, res) => {
    Grid.findById(req.params.id)
		.then(grid => {
            res.status(200).json(grid)
        })
		.catch(err => {
            res.status(404).json({ errors: 'No grid found' })
        });
});



// gaming functionality

makeGameGrid = (x, y, gridString) => {
    var len = gridString.length;
    let gridArray;

    for(var i = 0; i < len; ) {
        var eachRow = gridString.substring(i, i+x);
        gridArray.push(eachRow);
        i = i+x;
    }

    return gridArray;
}

IsValid = (a, b, x, y) => {
    return ( ( a < x && a >= 0 ) && ( b < y && b >= 0 ) ) ? true:false;
}

// const fx = {};
// const fy = {};

checkNeighbor = (i, k, presentGrid) => {
    var count = 0;

    var newX = i+(-1);
    var newY = k+0;
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(-1); newY = k+(+1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(+0); newY = k+(+1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(+1); newY = k+(+1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(+1); newY = k+(+0);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(+1); newY = k+(-1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(+0); newY = k+(-1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    newX = i+(-1); newY = k+(-1);
    if(IsValid(newX, newY) && presentGrid[newx][newY] == '*') count++;

    return count;
}


stateAfterOneMove = (x, y, presentGrid) => {
    // return nextState of grid representation
    var nextGrid = [...presentGrid];

    for(var i = 0; i < presentGrid.length; i++) {
        var len = presentGrid[i].length;
        for(var k = 0; k < len; k++) {
            var charValue = presentGrid[i][k];

            var check;
            if(charValue == '*') {
                check = checkNeighbor(i, k, presentGrid);
                if(check >= 2) {
                    nextGrid[i][k] = '*';
                }
                else {
                    nextGrid[i][k] = '.';
                }
            }
            else if( charValue == '.') {
                check = checkNeighbor(i, k, presentGrid);
                if(check >= 3) {
                    nextGrid[i][k] = '*';
                }
                else {
                    nextGrid[i][k] = '.';
                }
            }
        }
    }

    return nextGrid;
}


stateAfterMoves = (x, y, presentGrid, presentState, nextState) => {

    for(var i = presentState; i <= nextState; i++) {
        var nextGrid = stateAfterOneMove(x, y, presentGrid)
        presentGrid = [...nextGrid];
    }

    return nextGrid;
}

// @route patch /grids/:id/after/age?1,2,3
// @description get grids of different state
// @access Public
router.get('/:id/after', (req, res) => {

    //spliting age data using comma
    var age_str = req.query['age'];
    var agelist = age_str.split(',');

    // tring agelist (array) if any space remaining
    for (var i = 0; i < agelist.length; i++) {
        agelist[i] = agelist[i].trim()
    }


    Grid.findById(req.params.id)
        .then(grid => {

            // making actual gaming grid
            let presentGrid = makeGameGrid(x, y, grid);
            console.log(presentGrid);
            var stateCount = 0;

            // result data
            var data;
            var Id = req.params.id;
            var xx = x;
            var yy = y;

            // determining new state
            for(var i = 0; i < agelist.length; i++) {
                var nextState = agelist[i];

                var newGrid = stateAfterMoves(x, y, presentGrid, presentState, nextState);

                data.push(newGrid);
                presentState = nextState;
                presentGrid = newGrid;
            }

            res.status(200).json({Id, xx, yy, data});
        })
        .catch(err => {
            res.status(404).json({ errors: 'No grid found' })
        });
});

module.exports = router;