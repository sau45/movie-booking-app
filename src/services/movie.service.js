const { CustomError } = require("../middleware/errorHandler");
const Movie = require("../model/movie.model");

const createMovie = async (movieData) => {
  const createdMovie = await Movie.create(movieData);
  if (!createdMovie) {
    throw new CustomError("Movie not created", 404);
  }
  return createdMovie;
};
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new CustomError("Movie not fetched", 400);
  }
  return movie;
};

const deleteMovieById = async (id) => {
  const existId = await Movie.findOne({ id });
  if (!existId)
    throw new CustomError("Movie not exist or deleted already", 404);
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie)
    throw new CustomError("Something went wrong while deleting movie", 400);
  return deletedMovie;
};

module.exports = { getMovieById, deleteMovieById, createMovie };
