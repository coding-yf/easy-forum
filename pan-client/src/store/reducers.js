import { combineReducers } from 'redux';
/*actionTypes*/
import {SAVE_USERNAME} from './actionTypes.js';

const initValue = {
  username: 'hello'
};
function name_reducer(state = initValue, action) {
  switch (action.type) {
    case SAVE_USERNAME:
      alert('已到达name_reducer');
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}

let reducers = combineReducers({
  name: name_reducer
});

export default reducers;
