import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_ALBUMS = gql`
  query {
    albums {
      title
      user {
        name
      }
      photos {
        title
        thumbnailUrl
      }
    }
  }
`;

const App = () => (
  <Query query={GET_ALBUMS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>`Error :( ${error}`</div>;

      return data.albums.map(album => {
        return (
          <div>
            <h1>"{album.title}"</h1>
            <h3>By: {album.user.name}</h3>

            {album.photos.map(photo => {
              return (
                <img
                  src={photo.thumbnailUrl}
                  height="150"
                  width="150"
                  alt={photo.title}
                />
              );
            })}
          </div>
        );
      });
    }}
  </Query>
);

export default App;
