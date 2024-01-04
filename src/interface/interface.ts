import { FocusEvent, ChangeEvent, ReactNode } from "react";
import { DraggableProvided } from "react-beautiful-dnd";

export interface AuthInterface {
  isRegisterLoading: boolean;
  registerUserDetails: any;
  registerUsererror: string | null;
  isLoginLoading: boolean;
  loginUserDetails: any;
  loginUserError: string | null;
}

export interface HeaderPropsInterface {
  setIsModalOpen: (isOpenModal: boolean) => void;
  isOpenModal?: boolean;
}

export interface RouteAuthGuardPropsInterface {
  children: ReactNode;
}

export interface RegisterInterface {
  email: string;
  password: string;
  username: string;
}

export interface TodoInterface {
  taskTitle: string;
  content: string;
  username?:string;
  status?:string;
}

export interface TodoAllInterface{
  isCreateTodoLoading: boolean,
  todos: IData,
  createTodoError: string| null,
  createTodoMessage:boolean | string,
  isLoading:boolean,
  error:string|null,
  editTodo:any|boolean,
  editTodoMessage:boolean|string
}

export interface AuthUser {
  uid: string;
  email: string | null;
  name?: string | null;
}

export interface AuthUserDetails {
  name: string;
  email: string;
}

export interface InputProps {
  label: string;
  name: string;
  type: "text" | "textarea" | "email" | "password";
  placeholder: string;
  value: string;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | undefined;
  touched?: boolean | undefined;
}

export interface ITask {
  id: string;
  content: string;
  taskTitle:string;
  username:string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ITasks {
  [key: string]: ITask;
}

export interface IColumns {
  [key: string]: IColumn;
}

export interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}

export interface IXColumn {
  className?: string;
  column: IColumn;
  tasks: ITask[];
  provided?: DraggableProvided;
}

