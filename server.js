import { GraphQLServer } from 'graphql-yoga';
import DataLoader from 'dataloader';
import { get, resolvers, typeDefs } from './graphql';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    dataLoader: new DataLoader(urls => Promise.all(urls.map(url => get(url))))
  }
});

server.start(() => console.log('Server is running on localhost:4000'));
