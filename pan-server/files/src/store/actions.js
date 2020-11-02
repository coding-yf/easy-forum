/*actionTypes*/
import {SAVE_USERNAME} from './actionTypes.js';

/*action构造函数*/
const save_username = (username) => {
  alert('已到达actions.js')
  return {
    type: SAVE_USERNAME,
    username
  };
};

export {
  save_username
};

