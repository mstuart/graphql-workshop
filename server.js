import { GraphQLServer } from 'graphql-yoga';
import { invoke } from './graphql';

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
    albums: async () => await invoke('/albums'),

    album: async (rootObj, { albumId }) => {
      const albums = await invoke('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    // Here we're picking out the "id" property from Query.albums above.
    // Our schema references the album ID as "albumId", not "id"
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
