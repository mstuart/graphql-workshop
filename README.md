# graphql-workshop

In this workshop, we are going to create a GraphQL API that integrates with an external REST API. We are going to create schemas and resolver functions and discover some best practices along the way.

This workshop is broken up into steps that are separated by Git branches. Start with `step1` and move forward from there.

This app relies on [graphql-yoga](https://github.com/prisma/graphql-yoga) and [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas).

Let's go!

## Installation

1. Ensure you're using at least `node@8` and `npm@5`
2. Clone, install, and run the server

```
$ npm install
$ npm start
$ open http://localhost:4000
```

## Using GraphQL Playground

After running the server and launching [localhost:4000](http://localhost:4000), you'll end up at GraphQL Playground. GraphQL Playground is a great tool for writing and testing out queries. GraphQL Playground has some docs to explore on the right panel and offers an auto-complete-as-you-type experience. This is what GraphQL is all about, the developer experience! :-)

<img width="1400" alt="screen shot 2018-05-09 at 23 12 38" src="https://github.paypal.com/storage/user/718/files/8116bb40-53de-11e8-8386-9ba49a61a40c">
