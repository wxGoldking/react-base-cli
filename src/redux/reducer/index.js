import { combineReducers } from 'redux';
import count from './count.js';
import todo from './todo.js';

export default combineReducers({
  count,
  todo
})