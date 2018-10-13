export default {
  Album: {
    albumId: ({ id }) => id,

    user: async ({ userId }, args, { dataLoader }) =>
      await dataLoader.load(`/users/${userId}`)
  }
};
