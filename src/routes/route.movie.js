const MovieController = require('../controller/movie.controller');
const { authProtect } = require('../middleware/authHandler');
const roleAuthorization = require('../middleware/roleHandler');
const validate = require('../middleware/validateSchema');
const movieZodSchema = require('../zodSchema/movie.schema');
const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    authProtect,
    roleAuthorization(['admin', 'manager']),
    validate(movieZodSchema),
    MovieController.createMovie
  );
  app.get('/mba/api/v1/movies/:id', roleAuthorization(['admin', 'manager']), authProtect, MovieController.getMovie)
  app.delete('/mba/api/v1/movies/:id', roleAuthorization(['admin', 'manager']), authProtect, MovieController.deleteMovie)
}

module.exports = routes