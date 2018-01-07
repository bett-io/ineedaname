import { combineReducers } from 'redux';

const names = (state = [], action) => {
  switch (action.type) {
    case 'NAMES_UPDATED':
      return action.names;
    default:
      return state;
  }
};

const goodServiceNameProbs = (state = {}) => state;

const reducer = combineReducers({
  names,
  goodServiceNameProbs,
});

export default reducer;
