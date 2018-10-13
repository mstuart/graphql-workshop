import { GraphQLServer } from 'graphql-yoga';
import DataLoader from 'dataloader';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = url => client.get(url).then(({ data }) => data);

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

// EXERCISE #6 --
//
// You might've wondered.. what does a real GraphQL project look like in practice?
// This file's already almost a couple hundred lines long.
// It does a lot. It's a server. It has all of your schema and resolvers.
// It has all of your data-fetching and business logic.
//
// Let's separate our schemas and resolvers out into other files and directories.
// Maybe in the future we can add tests alongside them too.
//
// Oddly enough, there aren't default tools to handle merging in a safe way.
// As if this writing, you can't just string concat schemas because they might override each other
// and not merge together properly.
//
// `merge-graphql-schemas` handles this well. There are a few other alternatives too.
//
// We're not going to code in this exercise. 😅
// Switch to the "step6-solution" branch to see how a project is typically structured.
//
const resolvers = {
  Query: {
    albums: async (rootObj, { albumId, userId }, { dataLoader }) => {
      const albums = await dataLoader.load('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }, { dataLoader }) => {
      const albums = await dataLoader.load('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id,

    user: async ({ userId }, args, { dataLoader }) =>
      await dataLoader.load(`/users/${userId}`)
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

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    dataLoader: new DataLoader(urls => Promise.all(urls.map(url => get(url))))
  }
});

server.start(() => console.log('Server is running on localhost:4000'));
