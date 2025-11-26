const MovieController = require('../controller/movie.controller')
const routes = (app)=>{
    app.post('/mba/api/v1/movies',MovieController.createMovie)
    app.get('/mba/api/v1/movies/:id',MovieController.getMovie)
    app.delete('/mba/api/v1/movies/:id',MovieController.deleteMovie)
}

module.exports=routes