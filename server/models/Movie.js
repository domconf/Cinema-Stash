const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  Directors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = movieSchema;
