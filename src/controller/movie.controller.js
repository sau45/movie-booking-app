const Movie = require("../model/movie.schema");
const movieService = require("../services/movie.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if (response.err) {
      return res.status(response.code).json({
        ...errorResponseBody,
        error: response.err,
        message: "Invalid request",
      });
    }

    return res.status(201).json({
      ...successResponseBody,
      data: response,
      message: "Succesfully movie created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ...errorResponseBody,
      error: error,
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);

    if (response.err) {
      return res.status(response.code).json({
        ...errorResponseBody,
        error: response.err,
      });
    }
    return res.status(200).json({
      ...successResponseBody,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ...errorResponseBody,
      error: error,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovieById(req.params.id);
    if (response.err) {
      return res.status(response.code).json({
        ...errorResponseBody,
        error: response.err,
        message: "Failed to delete movie",
      });
    }
    return res.status(200).json({
      ...successResponseBody,
      data: response,
      message: "Successfully movie deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ...errorResponseBody,
      error: error,
    });
  }
};

module.exports = { createMovie, getMovie, deleteMovie };
