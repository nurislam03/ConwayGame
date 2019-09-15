const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GridSchema = new Schema({
  x: {
    type: String,
    required: true
  },
  y: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    defaule: Date.now
  }
});

module.exports = Grid = mongoose.model('grids', GridSchema);