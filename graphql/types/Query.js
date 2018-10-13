export default {
  Query: {
    albums: async (rootObj, { albumId, userId }, { dataLoader }) => {
      const albums = await dataLoader.load('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }, { dataLoader }) => {
      const albums = await dataLoader.load('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  }
};
