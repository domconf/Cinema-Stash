const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema({
  // saved Movie id from API
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
