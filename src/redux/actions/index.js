import * as types from "../types";

export const count_add = (data) => ({ type: types.ADD, data })
export const count_minus = (data) => ({ type: types.MINUS, data })
export const todo_add = (data) => ({ type: types.ADD_ITEM, data })
export const todo_delete = (data) => ({ type: types.DELETE_ITEM, data })