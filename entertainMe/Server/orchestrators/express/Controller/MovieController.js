const Movie = require("../Model/MovieModel");
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class Controller {
  static async showMovies(req, res) {
    try {
      const url = "http://localhost:3001/movies";
      const movieChaced = await redis.get("movies");

      if (movieChaced) {
        res.send(JSON.parse(movieChaced));
      } else {
        axios
          .get(url)
          .then(async (res) => {
            const movies = res.data;
            await redis.set("movies", JSON.stringify(movies));
            return res.send(movies);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async updateMovies(req, res) {
    try {
      const url = `http://localhost:3001/movies/${req.params.id}`;
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
          const movies = resp.data;
          await redis.del('movies')
          res.send(movies);
        });
    } catch (err) {
      console.log(err);
    }
  }

  static async createMovie(req, res) {
    try {
      const url = `http://localhost:3001/movies`;
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
          const movie = resp.data;
          await redis.del('movies')
          res.send({ movie, message: "data has been created" });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err, "<==== errornya masuk kesini");
    }
  }

  static async deleteMovie(req, res) {
    try {
      const id = req.params.id;
      const url = `http://localhost:3001/movies/${id}`;
      axios
        .delete(url)
        .then((data) => {
          res.send({ message: "data has been deleted" });
          redis.del('movies')
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
