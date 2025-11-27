const { z } = require("zod");

const movieZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  cast: z.array(z.string()).min(2, "At least two cast members are required"),
  language: z.string().min(1, "Language is required"),
  director: z.string().min(1, "Director is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  releaseStatus: z.enum(["RELEASED", "UNRELEASED"]),
  trailerUrl: z.string().url("Invalid trailer URL"),
});

module.exports = movieZodSchema;
