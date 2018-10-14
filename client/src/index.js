import React from 'react';
import { render } from 'react-dom';

// apollo-boost is a quick way to get started w/ apollo-client.
// Read https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost
import ApolloClient from 'apollo-boost';

// ApolloProvider makes your apollo client available to your React component tree
import { ApolloProvider } from 'react-apollo';

// Importing the App we're going to be working on.  See client/src/App.js
import App from './App';

import './index.css';

// Create an Apollo client, passing it the URL of our GraphQL API.
// This is the simplest way to get started.
// In a real world scenario, you'd likely want to tune the cache and batch settings..
// Here are some other options: https://www.apollographql.com/docs/react/essentials/get-started.html#configuration
const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

// This is where we're rendering our React app.
// Using ApolloProvider to provide our client to our App component.
// And we're injecting our React app into the DOM.
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
