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
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = movieSchema;
