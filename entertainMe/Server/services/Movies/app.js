const { MongoClient } = require("mongodb");
const express = require('express');
const app = express();
const PORT = 3001;
const movieRouter = require('./Routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`MOVIESSSSSSSSS APP listening at http://localhost:${PORT}`);
});

