const TvSeries = require("../Model/TvSeries.js");

class TvSeriesController {
  static async showAllTvSeries(req, res) {
    const serialTv = await TvSeries.showAllTvSeries();
    res.status(200).json(serialTv);
  }

  static async showTvSeries(req, res) {
    const id = req.params.id
    const serialTv = await TvSeries.showTvSeries(id);
    res.status(200).json(serialTv);
  }

  static async addTvSeries(req, res) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    if(popularity % 1 === 0){
      popularity = parseFloat(popularity);
      popularity/=10
    }
    const newData = await TvSeries.addData({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
    console.log(req.body)
    res.status(201).json(newData.ops[0]);
  }

  static async deleteTvSeries(req, res) {
    const id = req.params.id;
    const deletingData = await TvSeries.deleteData(id);
    res
      .status(200)
      .json(deletingData.value);
  }

  static async updateTvSeries(req, res) {
    const id = req.params.id;
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (popularity % 1 === 0) {
      popularity = parseFloat(popularity);
      popularity = popularity / 10;
    }
    const updatedData = await TvSeries.updatingTvSeries(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
    res.status(200).json(updatedData);
  }
}

module.exports = TvSeriesController;
