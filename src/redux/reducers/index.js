
import { TOKEN, LOGIN, LOGOUT, SCORE } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    score: 0,
    assertions: '',
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
        score: 0,
      },
    };
  case SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.payload.newScore,
      },
    };
  case LOGOUT:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default loginReducer;
