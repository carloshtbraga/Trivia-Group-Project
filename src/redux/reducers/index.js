import { combineReducers } from 'redux';
import { TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state, token: action.payload.token,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;
