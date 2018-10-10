import { GraphQLServer } from 'graphql-yoga';
import DataLoader from 'dataloader';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = url => client.get(url).then(({ data }) => data);

const dataLoader = new DataLoader(urls =>
  Promise.all(urls.map(url => get(url)))
);

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

    # The title of the album (Ex: "Nevermind")
    title: String

    # The User associated with this album
    user: User

    # The User ID that is associated this album
    userId: ID @deprecated
  }

  type User {
    # The User's ID (Ex: "1")
    userId: ID

    # The User's name (Ex: "Leanne Graham")
    name: String

    # The User's username (Ex: "lgraham")
    username: String

    # The User's email (Ex: "lgraham@yahoo.com")
    email: String

    # The User's address. See Address type.
    address: Address

    # The User's phone number (Ex: "1-800-COLLECT")
    phone: String

    # The User's website (Ex: "google.com")
    website: String

    # The User's company. See Company type.
    company: Company
  }

  type Address {
    # The Address' first line (Ex: "123 Main St")
    line1: String

    # The Address' second line (Ex: "Apt 456")
    line2: String

    # The Address' city (Ex: "San Jose")
    city: String

    # The Address' postal code (Ex: "95050")
    postalCode: String

    # The Address' geo coordinates.  See GeoCoordinates type.
    geoCoordinates: GeoCoordinates
  }

  type GeoCoordinates {
    # Latitude (Ex: "-37.3159")
    latitude: String

    # Longitude (Ex: "91.1496")
    longitude: String
  }

  type Company {
    # Company's name (Ex: "Hooli")
    name: String

    # Company's catch phrase (Ex: "I like turtles")
    catchPhrase: String

    # Company's bullshit catch phrase (Ex: "Making the world a better place")
    bullshit: String
  }
`;

// EXERCISE #5 -- Ok!  Last step.
// See how we have dataLoaders everywhere?  Let's refactor that up using context.
//
// `graphql-yoga`, `apollo-server`, `express-graphql` and most GraphQL runtimes
// offer a "context" object that can be shared w/ all of your resolvers.
// It's a great place for really common/core pieces like auth states, API utilities,
// caches, or the Express request object if your API depends on a lot of request state.
//
// Let's add our DataLoader instance to the context Object and refactor
// our code to use it.  The docs will be helpful -- https://github.com/prisma/graphql-yoga#constructorprops-props-graphqlserver
const resolvers = {
  Query: {
    albums: async (rootObj, { albumId, userId }) => {
      const albums = await dataLoader.load('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }) => {
      const albums = await dataLoader.load('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id,

    user: async ({ userId }) => await dataLoader.load(`/users/${userId}`)
  },

  User: {
    userId: ({ id }) => id
  },

  Address: {
    line1: ({ street }) => street,
    line2: ({ suite }) => suite,
    postalCode: ({ zipcode }) => zipcode,
    geoCoordinates: ({ geo }) => geo
  },

  Company: {
    bullshit: ({ bs }) => bs
  },

  GeoCoordinates: {
    latitude: ({ lat }) => lat,
    longitude: ({ lng }) => lng
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
