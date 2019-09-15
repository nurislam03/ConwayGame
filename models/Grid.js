const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GridSchema = new Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
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