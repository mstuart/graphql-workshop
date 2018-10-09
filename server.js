import { GraphQLServer } from 'graphql-yoga';
import { invoke } from './graphql';

const typeDefs = `
  type Query {
    # A list of albums. See Album type
    albums: [Album]
  }

  type Album {
    # The Album's ID (which is unique)
    albumId: ID

    # The User ID that is associated this album
    userId: ID

    # The title of the album (Ex: "Nevermind")
    title: String
  }
`;

const resolvers = {
  Query: {
    // We're using an async function called "invoke" that hits the
    // http://jsonplaceholder.typicode.com/ API.  We're fetching
    // the GET /posts resource and returning it.
    //
    // By returning it, it's available to Album resolvers as "rootObj".
    // "rootObj" is used for passing data from parent-to-child.
    //
    // EXERCISE #1 -- Currently, we're returning the entire list of albums
    // It's likely that our clients may want a small subset of those albums
    // if they're implementing pagination or a search feature, etc.
    // Let's add an optional parameter to allow clients to filter by "albumId"
    //
    albums: async () => await invoke('/albums')
  },

  Album: {
    // Here we're picking out the "id" property from Query.albums above.
    // Our schema references the album ID as "albumId", not "id"
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
