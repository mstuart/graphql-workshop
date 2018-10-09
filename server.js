// "graphql-yoga" is a pretty neat package 📦 for getting started w/ GraphQL quickly.
// It's built on top of apollo-server (or Express) w/ some nice defaults.
// It will include an IDE called GraphQL Playground for testing queries.
// To read more about it, see https://github.com/prisma/graphql-yoga
// ⚡
const { GraphQLServer } = require('graphql-yoga');

// "typeDefs" is your GraphQL schema.
//
// In this example, we have a single type.
// As you can imagine, you'll eventually have LOTS of schema types, enums, etc.
//
// These can be merged by hand using something like lodash, or safely merged using ASTs.
// Libraries like "merge-graphql-schemas" or "ne-schemata" are good at this.
// You can give them a directory and they'll merge all of your schema files for you.
const typeDefs = `
  # You can add single line comments
  type Query {

    """
    Or multi-line comments w/ markdown! ![doge](https://media0.giphy.com/media/aFTt8wvDtqKCQ/giphy.gif)

    Note that the hello field accepts an optional argument called "name"
    """
    hello(name: String): String!
  }
`;

// Resolvers are functions that map 1-to-1 with your GraphQL schema.
// Every type and field in your schema has a resolver function.
//
// If you think of a GraphQL query as a tree, resolvers are executed from top
// to bottom and it will execute adjacent fields in parallel.
//
// If you don't specify a resolver, the runtime provides a default one that tries
// to resolve it itself by grabbing the property from "rootObj".
//
// Every resolver has the same function signature.
// We refer to it as "RACI", which is "root", "args", "context", "info"
// "root" is an Object passed from parent types to child fields
// "args" is an Object that contains arguments (Ex: "name" in the case below)
// "context" is an Object of common properties shared between all resolvers
// "info" is an Object containing information about the GraphQL query
//
// Resolvers can be sync or async. They can resolve values from an API, cache, etc.
const resolvers = {
  Query: {
    hello: (rootObj, { name }, context, info) => `Hello ${name || 'World'}`
  }
};

// At startup, the GraphQL runtime needs a handle on your schema and
// resolver functions.  This gets interesting when you can fetch schemas
// remotely, mutate them, and pass them off to your server.
// Google "GraphQL schema stitching" if you're interested.
const server = new GraphQLServer({ typeDefs, resolvers });

// Hello world!
server.start(() => console.log('Server is running on localhost:4000'));
