const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

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

const resolvers = {
  Query: {
    photos: async () => {
      try {
        const photos = await axios.get(`https://api.unsplash.com/photos/?client_id=${KEY}`)

        return photos.data.map(({ id, title, urls, user }) => ({
          id,
          title,
          urls,
          user
        }))
      } catch (error) {
        throw error
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen()
.then(({ url }) => console.log(`Server is ready at ${url}`))
