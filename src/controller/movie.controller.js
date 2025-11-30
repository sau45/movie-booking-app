const asyncHandler = require("../middleware/asyncHandler");
const Movie = require("../model/movie.model");
const movieService = require("../services/movie.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

const createMovie = asyncHandler(async(req,res)=>{
  const response = await movieService.createMovie(req.body);

  return res.status(201).json({
    success:true,
    data:response
  })
})

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.id);

  res.status(200).json({
    success: true,
    data: movie,
  });
});


const deleteMovie = asyncHandler(async(req,res)=>{
  const deletedMovie = await movieService.deleteMovieById(req.params.id);
  return res.status(200).json({
    success:true,
    data:deletedMovie
  })
})

module.exports = { createMovie, getMovie, deleteMovie };
