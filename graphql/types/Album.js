export default {
  Album: {
    albumId: ({ id }) => id,

    user: async ({ userId }, args, { dataLoader }) =>
      await dataLoader.load(`/users/${userId}`),

    photos: async ({ id }, args, { dataLoader }) => {
      const photos = await dataLoader.load(`/photos?albumId=${id}`);

      return photos.slice(0, 10);
    }
  }
};
