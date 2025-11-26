const { default: mongoose } = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      require: true,
    },
    language: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      required: true,
      status: "RELEASED",
    },
    trailerUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
