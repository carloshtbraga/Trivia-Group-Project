import { TOKEN, LOGIN, LOGOUT } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  case LOGIN:
    return {
      ...state,
      player: {
        gravatarEmail: action.payload.gravatar,
        name: action.payload.name,
        score: '0',
      },
    };
  case LOGOUT:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default loginReducer;
