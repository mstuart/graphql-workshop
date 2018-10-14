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

// For this workshop, let's take a look at how a browser can integrate with a GraphQL API.
// Many of the same capabilities exist in other clients for iOS, Android, etc.
//
// You can integrate with something as simple as XHR/fetch (or any HTTP client) --
//
// fetch('/graphql', {
//   method: 'POST',
//   body: {
//     query: `
//       {
//         user {
//           name
//           addresses(type: BILLING) {
//             fullAddress
//           }
//         }
//       }
//     `
//   }
// })
// .then(response => response.json())
// .then(json => {
//   // ...
// })
//
// or something full featured like `apollo-client`, which provides the ability to co-locate queries
// alongside many components.  As you add data requirements to your components, you add or remove
// fields in your queries as you're modifying your UI.  That way your app always stays nimble and you
// never fetch more than you neeed.  It has some smarts w/ caching and batching too.
//
// const USER_QUERY = gql`
//   query {
//     user {
//       name
//       addresses(type: BILLING) {
//         fullAddress
//       }
//     }
//   }
// `;
//
// const UserProfileComponent = () => (
//   <Query query={USER_QUERY}>
//     {({ loading, error, data }) => {
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>Error :(</div>;
//
//       return (
//         <div>
//           <span>{name}</span>
//           <ul>
//             {addresses && addresses.map(address => (
//               <li>{address.fullAddress}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }}
//   </Query>
// );
//
// export default UserProfileComponent;
//
//
// Let's integrate a React app w/ our GraphQL API.
// For simplicity, we used `create-react-app` to generate the app.
// We're also going to use `apollo-client` and check out its capabilities.
// It's already setup.  We just need to install dependencies.
//
// Open up another Terminal tab and `cd client/`, `npm install` then `npm start`.
// If all goes well, you should see http://localhost:3000 open in your browser.
//
// Now, you should have two terminal tabs running.
// One w/ your Node server and one w/ your client/ app.
// NOTE: Use `npm start` to start both servers so hot reloading is enabled.
//
// Open up client/src/index.js and read through the comments to see how it's wired up.
//
// After that, open up client/src/App.js
