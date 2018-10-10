import { GraphQLServer } from 'graphql-yoga';
import { invoke } from './graphql';

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

const resolvers = {
  Query: {
    albums: async (rootObj, { albumId, userId }) => {
      const albums = await invoke('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }) => {
      const albums = await invoke('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
