const MovieController = require('../controller/movie.controller')
const validate = require('../middleware/validateSchema');
const movieZodSchema = require('../zodSchema/movie.schema');
const routes = (app)=>{
    app.post(
      "/mba/api/v1/movies",
      validate(movieZodSchema),
      MovieController.createMovie
    );
    app.get('/mba/api/v1/movies/:id',MovieController.getMovie)
    app.delete('/mba/api/v1/movies/:id',MovieController.deleteMovie)
}

module.exports=routes