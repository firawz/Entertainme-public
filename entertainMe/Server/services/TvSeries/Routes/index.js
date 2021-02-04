const route = require('express').Router()
const Controller = require('../Controller/TvSeriesController')

route.get('/tvseries', Controller.showAllTvSeries)
route.get('/tvseries/:id', Controller.showTvSeries)
route.post('/tvseries', Controller.addTvSeries)
route.delete('/tvseries/:id', Controller.deleteTvSeries)
route.put('/tvseries/:id', Controller.updateTvSeries)

module.exports = route