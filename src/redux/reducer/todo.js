import * as types from "../types";
const data = {
  todoList: [
    {index: 0, content: '小时不识月，'}, 
    {index: 1, content: '呼作白玉盘。'},
    {index: 2, content: '又疑瑶台镜，'},
    {index: 3, content: '飞在青云端。'},
  ],
  list: []
}

export default function todo(state = data, action){
  switch (action.type) {
    case types.ADD_ITEM:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          action.data
        ]
      };
    case types.DELETE_ITEM:
      return {
        ...state,
        todoList: state.todoList.filter(v => v.index !== action.data.index)
      };
    case types.GET_LIST:
      return {
        ...state,
        list: [...action.data]
      };
    default:
      return state;
  }
}