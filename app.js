const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type URL {
    regular: String
  }

  type User {
    username: String
    portfolio_url: String
  }

  type Photo {
    id: ID
    title: String
    urls: URL
    user: User
  }

  type Query {
    photos: [Photo]
  }
`;
