const db = require("../config");
const { ObjectId } = require("mongodb");
const TvSeriesList = db.collection("TvSeries");

class TvSeries {
  static showAllTvSeries() {
    return TvSeriesList.find().toArray();
  }

  static showTvSeries(id) {
    return TvSeriesList.findOne({_id: ObjectId(id)})
  }

  static addData(data) {
    return TvSeriesList.insertOne(data);
  }

  static deleteData(id) {
    return TvSeriesList.findOneAndDelete({ _id: ObjectId(id) });
  }

  static async updatingTvSeries(
    id,
    { title, overview, poster_path, popularity, tags }
  ) {
    const data = await TvSeriesList.findOne({ _id: ObjectId(id) });
    if (!title) {
      title = data.title;
    }
    if (!overview) {
      overview = data.overview;
    }
    if (!poster_path) {
      poster_path = data.poster_path;
    }
    if (!popularity) {
      popularity = data.popularity;
    }
    if (!tags) {
      tags = data.tags;
    }
    
    const newData = { title, overview, poster_path, popularity, tags };

    return TvSeriesList.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: newData },
      { returnOriginal: false }
    );
  }
}

module.exports = TvSeries;
