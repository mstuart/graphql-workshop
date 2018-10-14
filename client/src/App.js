import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

// If everything is working, you should see "hi!" in hot pink at localhost:3000
const App = () => {
  return <h1 style={{ color: 'hotpink', fontSize: '5em' }}>hi!</h1>;
};

// @TODO Uncomment me and delete the other App component above.
//
// // NOTE: You'll have an error in your browser, but don't worry.  We'll fix it later.
//
// //
// // It's worth calling out that this query is co-located next to its markup below.
// //
// // This is an important dev feature that allows for queries to stay lean over time.
// // Because a query is next to the component that uses it, it's more likely that a
// // developer will add/remove fields from a query as they modify their component
// // over time.  So you'll never overfetch data.  It also makes for code that's
// // easier to debug and understand.
// const GET_ALBUMS = gql`
//   query {
//     albums {
//       title
//       user {
//         name
//       }
//     }
//   }
// `;
//
// const App = () => (
//   <Query query={GET_ALBUMS}>
//     {({ loading, error, data }) => {
//       // Apollo provides some nice indicators for loading and error states
//       // in case you wanted to show a spinner or handle errors within your component.
//       // The rest of your API data is available under "data"
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>`Error :( ${error}`</div>;
//
//       //
//       // EXERCISE #7 --
//       //
//       // Let's loop over our albums and display their title, the user that created them, and the album's photos.
//       // Our Album type now has a photos field that returns an album's photos.
//       // See graphql/types/Album.graphql and graphql/types/Photo.graphql
//       //
//       // Step 1) The title and user name are placeholders.  Replace PLACEHOLDER with {album.someproperty}
//       //
//       // Step 2) Modify the GET_ALBUMS query (at the top) to pull photos and their thumbnailUrl and title.
//       //
//       // Step 3) If all is well, the error should go away and you should see a list of albums, their titles,
//       //         creators and their images!
//       return data.albums.map(album => {
//         return (
//           <div>
//             <h1>"PLACEHOLDER"</h1>
//             <h3>By: PLACEHOLDER</h3>
//
//             {album.photos.map(photo => {
//               return (
//                 <img
//                   src={photo.thumbnailUrl}
//                   height="150"
//                   width="150"
//                   alt={photo.title}
//                 />
//               );
//             })}
//           </div>
//         );
//       });
//     }}
//   </Query>
// );

export default App;
