const route = require('express').Router()
const Controller = require('../Controller/movieController')

route.get('/movies', Controller.showAllMovie)
route.post('/movies', Controller.addMovie)
route.get('/movies/:id',Controller.showMovie)
route.delete('/movies/:id', Controller.deleteMovie)
route.put('/movies/:id', Controller.updateMovie)

module.exports = route