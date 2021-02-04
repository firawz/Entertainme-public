const Movie = require("../Model/Movie.js");

class MovieController {
  static async showAllMovie(req, res) {
    const movies = await Movie.showAllMovies();
    console.log(movies);
    res.status(200).json(movies);
  }

  static async showMovie(req, res) {
    const id = req.params.id;
    const movie = await Movie.showMovies(id);
    console.log(movie);
    res.status(200).json(movie);
  }

  static async addMovie(req, res) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (popularity % 1 === 0) {
      popularity = parseFloat(popularity);
      popularity = popularity / 10;
    }
    tags = tags.split(",");
    const newData = await Movie.addData({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
    console.log(newData);
    res.status(201).json(newData.ops[0]);
  }

  static async deleteMovie(req, res) {
    const id = req.params.id;
    const deletingData = await Movie.deleteData(id);
    res.status(200).json(deletingData.value);
  }

  static async updateMovie(req, res) {
    const id = req.params.id;
    console.log(req.body, "INI REQBODY DARI CONTRROLLER");
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (popularity % 1 === 0) {
      popularity = parseFloat(popularity);
      popularity = popularity / 10;
    }
    const updatedData = await Movie.updatingMovie(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
    res.status(200).json(updatedData);
  }
}

module.exports = MovieController;
