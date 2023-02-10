export const TOKEN = 'TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const tokenAction = (token) => ({
  type: TOKEN,
  payload: {
    token,
  },
});

export const loginAction = (gravatar, name) => ({
  type: LOGIN,
  payload: {
    gravatar,
    name,
  },
});

export const logoutAction = () => ({
  type: LOGOUT,
});
