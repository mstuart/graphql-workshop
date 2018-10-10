# graphql-workshop

In this workshop, we are going to create a GraphQL API that integrates with an external REST API. We are going to create schemas and resolver functions and discover some best practices along the way.

This workshop is broken up into steps that are separated by Git branches. You're likely on the `master` branch now, which has some introductions. After you read through the comments in [server.js](https://github.com/mstuart/graphql-workshop/blob/master/server.js), switch to the `step1` branch (with `$ git checkout step1`) and move forward from there. The `step1-solution` branch has the solution for `step1` and so on.  There are 6 steps to this workshop.

## Curriculum
- `master` branch — Introduces graphql-yoga and some GraphQL concepts like typeDefs, resolvers, etc.
- `step1` branch — Get familiar w/ adding new fields and resolvers.
- `step2` branch — Optional and required arguments and demonstrates the use of the `rootObj`
- `step3` branch — Deprecate a field.  Add a new field that is a “link” to another type.  This new field makes another API call.  More practice w/ schema design.
- `step4` branch — Dedupe API calls w/ [dataloader](https://github.com/facebook/dataloader)
- `step5` branch — Using `context` to share loaders between resolvers
- `step6` branch - Refactoring the project into a hierarchical directory structure w/ schema files and resolvers using [ne-schemata](https://github.com/nyteshade/ne-schemata).

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
