import { Dispatch } from "redux";
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import db from "../firebase";
import {
  createTodoError,
  createTodoRequest,
  createTodoSuccess,
  getTodoError,
  getTodoRequest,
  getTodoSuccess,
} from "../slice/todo.slice";
import { IData, TodoInterface } from "../interface/interface";

export const createTodo =
  (todoData: TodoInterface) => async (dispatch: Dispatch) => {
    dispatch(createTodoRequest());
    try {  
      dispatch(createTodoSuccess(todoData));
    } catch (error: any) {
      dispatch(createTodoError(error.message));
    }
  };

export const getTodo = () => async (dispatch: Dispatch) => {
  dispatch(getTodoRequest());
  try {
    const collections = collection(db, "todos");
    const todoQuery = query(collections);
    const docs = await getDocs(todoQuery);

    docs.forEach((doc: any) => {
      dispatch(getTodoSuccess(doc.data() as IData));
    });
  } catch (error: any) {
    dispatch(getTodoError(error.message));
  }
};
