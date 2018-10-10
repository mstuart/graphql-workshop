# graphql-workshop

[![PRs Welcome][prs-badge]][prs]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Table of Contents

- [Topics covered](#topics-covered)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Running the app](#running-the-app)

## Topics covered

In this workshop, we are going to create a GraphQL API that integrates with an external REST API. We are going to create schemas and resolver functions and discover some best practices along the way.

This workshop is broken up into steps that are separated by Git branches. You're likely on the `master` branch now, which has some introductions. After you read through the comments in `server.js`, switch to the `step1` branch and move forward from there. The `step1-solution` branch has the solution for `step1` and so on.

This app relies on [graphql-yoga](https://github.com/prisma/graphql-yoga) and [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas).

- [master](https://github.com/mstuart/graphql-workshop/tree/master) — Introduces [graphql-yoga](https://github.com/prisma/graphql-yoga) and some GraphQL concepts like typeDefs/schema, resolvers, etc.
- [step1](https://github.com/mstuart/graphql-workshop/tree/step1) — Get familiar w/ adding new fields and resolvers.
- [step2](https://github.com/mstuart/graphql-workshop/tree/step2) — Optional and required arguments and demonstrates the use of the `rootObj`
- [step3](https://github.com/mstuart/graphql-workshop/tree/step3) — Deprecate a field. Add a new field that is a “link” to another type. This new field makes another API call. More practice w/ schema design.
- [step4](https://github.com/mstuart/graphql-workshop/tree/step4) — Dedupe API calls w/ [dataloader](https://github.com/facebook/dataloader)
- [step5](https://github.com/mstuart/graphql-workshop/tree/step5) — Using `context` to share loaders between resolvers
- [step6](https://github.com/mstuart/graphql-workshop/tree/step6) - Refactoring the project into a hierarchical directory structure w/ schema files and resolvers using [ne-schemata](https://github.com/nyteshade/ne-schemata).

## System Requirements

- [git][git] v2.14.1 or greater
- [NodeJS][node] v8.9.4 or greater
- [npm][npm] v5.6.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Installation

1. Ensure you're using at least `node@8` and `npm@5`
2. Clone, install, and run the server

```
$ git clone https://github.com/mstuart/graphql-workshop.git
$ cd graphql-workshop
$ npm install
```

## Running the app

To get the app up and running (and really see if it worked), run:

```
$ npm start
$ open http://localhost:4000
```

`npm start` will start the API server. Your browser should open up automatically to `http://localhost:4000` (if it doesn't, just open that yourself) and you should be able to start messing around with the app.

Here's what you should be looking at:

<img width="800" alt="screen shot 2018-05-09 at 23 12 38" src="https://user-images.githubusercontent.com/742884/46708817-7aa72300-cbf5-11e8-8851-159d991cd537.png">

GraphQL Playground is a great tool for writing and testing out queries. GraphQL Playground has some docs to explore on the right panel and offers an auto-complete-as-you-type experience. This is what GraphQL is all about, the developer experience! :-)

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/mstuart/graphql-workshop.svg?style=social
[github-watch]: https://github.com/mstuart/graphql-workshop/watchers
[github-star-badge]: https://img.shields.io/github/stars/mstuart/graphql-workshop.svg?style=social
[github-star]: https://github.com/mstuart/graphql-workshop/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20graphql-workshop%20by%20@mstuart%20https://github.com/mstuart/graphql-workshop%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/mstuart/graphql-workshop.svg?style=social
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/mstuart/graphql-workshop/issues/new
[win-build-badge]: https://img.shields.io/appveyor/ci/mstuart/graphql-workshop.svg?style=flat-square&logo=appveyor
[win-build]: https://ci.appveyor.com/project/mstuart/graphql-workshop
