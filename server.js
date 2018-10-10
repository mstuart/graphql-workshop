import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = async url => client.get(url).then(({ data }) => data);

const typeDefs = `
  type Query {
    # A list of albums. See Album type
    albums: [Album]
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
    // We're using an async function called "get" that hits the
    // http://jsonplaceholder.typicode.com/ API.  We're fetching
    // the GET /posts resource and returning it.
    //
    // By returning it, it's available to Album resolvers as "rootObj".
    // "rootObj" is used for passing data from parent-to-child.
    //
    albums: async () => await get('/albums')

    // EXERCISE #1 -- Currently, we're returning the entire list of albums
    //
    // It's likely that our clients may want a single album with a given albumId.
    // Let's create another field called "album" that takes a required parameter
    // called "albumId" that returns that particular Album.
  },

  Album: {
    // Here we're picking out the "id" property from Query.albums above.
    // Our schema references the album ID as "albumId", not "id"
    albumId: ({ id }) => id
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
