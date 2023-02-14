export const TOKEN = 'TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SCORE = 'SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

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

export const sumScoreAction = (newScore) => ({
  type: SCORE,
  payload: {
    newScore,
  },
});

export const addAssertionsAction = () => ({
  type: ADD_ASSERTIONS,
});

export const logoutAction = () => ({
  type: LOGOUT,
});
