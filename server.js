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
    // EXERCISE #2 -- Okay, so we have a way to fetch all of the Albums and
    // a single Album.  What if our clients wanted to grab a subset of
    // Albums that match any of the fields like "albumId" or "userId"
    // Ex: If they're building a pagination or search UI
    //
    // Let's add two *optional* parameters that filters based on "userId" or "albumId"
    // NOTE: Optional, not required.
    // We still want people to be able to fetch all of the albums if they want to.
    albums: async () => await get('/albums'),

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
