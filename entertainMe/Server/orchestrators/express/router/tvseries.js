const route = require('express').Router()
const tvSeriesController = require('../Controller/TvSeriesController')

route.get('/', tvSeriesController.showTvSeries)
route.post('/', tvSeriesController.createTvSeries)
route.put('/:id', tvSeriesController.updateTvSeries)
route.delete('/:id', tvSeriesController.deleteTvSeries)

module.exports = route