const db = require("../config");
const { ObjectId } = require("mongodb");
const MovieList = db.collection("Movies");

class Movie {
  static showAllMovies() {
    return MovieList.find().toArray();
  }

  static showMovies(id) {
    return MovieList.findOne({_id: ObjectId(id)});
  }

  static addData(data) {
    console.log(data,'<========== ioni ')
    return MovieList.insertOne(data);
  }

  static deleteData(id) {
    return MovieList.findOneAndDelete({ _id: ObjectId(id) });
  }

  static async updatingMovie(
    id,
    { title, overview, poster_path, popularity, tags }
  ) {
    const data = await MovieList.findOne({ _id: ObjectId(id) });
    if (!title || title === '') {
      title = data.title;
    }
    if (!overview || overview === '') {
      overview = data.overview;
    }
    if (!poster_path || poster_path === '') {
      poster_path = data.poster_path;
    }
    if (!popularity || popularity === '') {
      popularity = data.popularity;
    }
    if (!tags || tags === '') {
      tags = data.tags;
    }
    if (!Array.isArray(tags)) {
      tags = tags.split(",");
    }// ini datanya jadi kosong ntah kenapa
    const newData = { title, overview, poster_path, popularity, tags };
    return MovieList.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: newData },
      { returnOriginal: false }
    );
  }
}

module.exports = Movie;
