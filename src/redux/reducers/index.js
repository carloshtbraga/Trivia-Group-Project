import { combineReducers } from 'redux';
import { TOKEN, LOGIN } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    gravatar: '',
    name: '',
    score: '',
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
        gravatar: action.payload.gravatar,
        name: action.payload.name,
        score: '0',
      },
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ loginReducer });

export default rootReducer;
