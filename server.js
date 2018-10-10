import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = async url => client.get(url).then(({ data }) => data);

const typeDefs = `
  type Query {
    # Returns all albums
    albums(albumId: ID, userId: ID): [Album]

    # Find an album with a certain albumId
    album(albumId: ID!): Album
  }

  type Album {
    # The Album's ID
    albumId: ID

    # The User ID that is associated this album
    userId: ID

    # The title of the album (Ex: "Nevermind")
    title: String
  }
`;

// EXERCISE #3 -- Ok, let's turn this up to eleven!
//
// Our Album type has a "userId", but that's not that useful to clients.
//
// If this was REST, clients would be expected to make another round-trip to
// the API to fetch associated User data.  We can do better than that!
//
// This exercise is broken into 3 parts.
//
// Part #1 --
// We want to allow clients to query for User data within an Album.
// Let's create a "link" between Album and User.
// Let's start by deprecating the "userId" field.  Add a @deprecated directive next to it.
//
// Part #2 --
// Inspect the http://jsonplaceholder.typicode.com/users/1 API.
// In this example, it's user #1.
// Create some schema types for this User.
// Hint: The "address" and "company" fields within User should be types.
// Be mindful of the return types you're using.
//
// Part #3 --
// Create a "user" field within the Album type that returns your new User type
// To get user data, use the `get` async function and hit the `GET /users/<id>` endpoint
const resolvers = {
  Query: {
    albums: async (rootObj, { albumId, userId }) => {
      const albums = await get('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }) => {
      const albums = await get('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
