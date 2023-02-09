export const TOKEN = 'TOKEN';

export const requestApi = (token) => ({
  type: TOKEN,
  payload: {
    token,
  },
});
