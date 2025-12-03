const MovieController = require('../controller/movie.controller');
// const  jwtRouteProtect  = require('../middleware/jwtRouteProtect');
const sessionRouteProtect = require('../middleware/sessionRouteProtect');
// const jwtRoleAuthorization = require('../middleware/jwtRoleHandler');
const sessionRoleAuthorization = require('../middleware/sessionRoleHandler');
const validate = require('../middleware/validateSchema');
const movieZodSchema = require('../zodSchema/movie.schema');
const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    // jwtRouteProtect,
    // jwtRoleAuthorization(['user', 'manager']),
    sessionRouteProtect,
    sessionRoleAuthorization(['admin', 'manager']),
    validate(movieZodSchema),
    MovieController.createMovie
  );
  app.get('/mba/api/v1/movies/:id',
    // jwtRouteProtect, 
    sessionRouteProtect,
    MovieController.getMovie)
  app.delete('/mba/api/v1/movies/:id',
    // jwtRouteProtect, 
    // jwtRoleAuthorization(['admin', 'manager']), 

    sessionRouteProtect,
    sessionRoleAuthorization(['admin', 'manager']),
    MovieController.deleteMovie)
}

module.exports = routes