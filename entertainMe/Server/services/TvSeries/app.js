const express = require('express');
const app = express();
const PORT = 3002;
const TvSeriesRouter = require('./Routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(TvSeriesRouter);

app.listen(PORT, () => {
  console.log(`TV SERiESSSSSSSS listening at http://localhost:${PORT}`);
});

