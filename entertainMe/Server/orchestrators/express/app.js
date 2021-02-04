const express = require("express");
const app = express();
const port = 3000;
const Redis = require("ioredis");
const redis = new Redis();
const Axios = require("axios");
const movieRouter = require('./router/movie')
const tvSeriesRouter = require('./router/tvseries')

app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRouter)

app.use("/tvseries", tvSeriesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
