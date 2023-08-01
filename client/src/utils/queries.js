import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
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
`;
