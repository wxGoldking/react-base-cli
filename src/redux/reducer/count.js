import * as types from "../types";
const data = {
  number: 0
}

export default function count(state = data, action){
  switch (action.type) {
    case types.ADD:
      return {
        ...state,
        number: state.number + action.data
      };
    case types.MINUS:
      return {
        ...state,
        number: state.number - action.data
      };
    default:
      return state;
  }
}