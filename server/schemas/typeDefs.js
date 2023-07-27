const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Movie {
    movieId: ID!
    directors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input InputMovie {
    movieId: String
    directors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(newBook: InputBook!): User
    removeMovie(bookId: ID!): User
  }
`;

module.exports = typeDefs;