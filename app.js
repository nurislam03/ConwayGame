const express = require('express');
const mongoose = require('mongoose');

// initializing routes
const grids = require('./routes/grids');

const app = express();

// DB congig
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlparser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/grids', grids);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));