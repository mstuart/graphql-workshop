import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = async url => client.get(url).then(({ data }) => data);

const typeDefs = `
  type Query {
    # Returns all albums
    albums: [Album]

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

const resolvers = {
  Query: {
    albums: async () => await get('/albums'),

    album: async (rootObj, { albumId }) => {
      const albums = await get('/albums');

      // We're using Array#find to search through the albums Array to find
      // the album that has this albumId.  Otherwise, we're returning null.
      //
      // NOTE: The ID scalar in GraphQL can either be a String or Number.
      // In our schema, "albumID" is an ID, so we need to cast albumId to
      // a Number before comparing it.
      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
