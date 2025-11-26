const Movie = require("../model/movie.schema");

const createMovie = async (movieData) => {
  const createdMovie = await Movie.create(movieData);
  if (!createdMovie)
    return {
      err: "Failed to create movie",
      code: 400,
    };
  return createdMovie;
};
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    return {
      err: "Something wrong with id you provided",
      code: 404,
    };
  }
  return movie;
};

const deleteMovieById = async (id) => {
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie)
    return { err: "Something wrong with id you provided", code: 404 };
  return deletedMovie;
};

module.exports = { getMovieById, deleteMovieById, createMovie };
