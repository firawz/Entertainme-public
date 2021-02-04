const route = require('express').Router()
const movieController = require('../Controller/MovieController')

route.get('/', movieController.showMovies)
route.post('/', movieController.createMovie)
route.put('/:id', movieController.updateMovies)
route.delete('/:id', movieController.deleteMovie)

module.exports = route