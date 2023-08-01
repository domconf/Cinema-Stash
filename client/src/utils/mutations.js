
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        movieCount
        savedMovies {
          movieId
          title
          year
          poster
        }
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($newMovie: InputMovie!) {
    saveMovie(newMovie: $newMovie) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        year
        poster
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        year
        poster
      }
    }
  }
`;
