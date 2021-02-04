const Movie = require("../Model/MovieModel");
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class Controller {
  static async showTvSeries(req, res) {
    try {
      const url = "http://localhost:3002/tvseries";
      const tvSeriesChaced = await redis.get("tvSeries");
      console.log("MASUK <========================");
      if (tvSeriesChaced) {
        res.send(JSON.parse(tvSeriesChaced));
      } else {
        axios
          .get(url)
          .then(async (res) => {
            const tvSeries = res.data;
            await redis.set("tvSeries", JSON.stringify(tvSeries));
            return res.send(tvSeries);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async updateTvSeries(req, res) {
    try {
      const url = `http://localhost:3001/tvseries/${req.params.id}`;
      const movieChaced = await redis.get("tvSeries");
      const { title, overview, poster_path, popularity, tags } = req.body;
      axios
        .put(url, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        })
        .then(async (resp) => {
          const tvSeries = resp.data;
          res.send(tvSeries);
        });
    } catch (err) {
      console.log(err);
    }
  }

  static async createTvSeries(req, res) {
    try {
      const url = `http://localhost:3002/tvSeries`;
      const { title, overview, poster_path, popularity, tags } = req.body;
      axios
        .post(url, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        })
        .then(async (resp) => {
          const Tvseries = resp.data;
          console.log(Tvseries);
          res.send({ Tvseries, message: "data has been created" });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err, "<==== errornya masuk kesini");
    }
  }

  static async deleteTvSeries(req, res) {
    try {
      const id = req.params.id;
      const url = `http://localhost:3001/tvseries/${id}`;
      axios
        .delete(url)
        .then((data) => {
          res.send({ message: "data has been deleted" });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
