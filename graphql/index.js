import path from 'path';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './**'), {
  extensions: ['.graphql'],
  recursive: true
});

const resolversArray = fileLoader(path.join(__dirname, './**'), {
  extensions: ['.js'],
  recursive: true,
  globOptions: { ignore: ['**/data/**', '**/*.test.js'] }
});

export * from './data';
export const typeDefs = mergeTypes(typesArray, { all: true });
export const resolvers = mergeResolvers(resolversArray);
