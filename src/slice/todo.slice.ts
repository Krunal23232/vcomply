import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../static/data";
import { IData, TodoAllInterface } from "../interface/interface";

const initialState: TodoAllInterface = {
  isCreateTodoLoading: false,
  todos: initialData,
  createTodoError: null,
  createTodoMessage: false,
  isLoading: false,
  error: null,
  editTodo: false,
  editTodoMessage: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodoRequest(state) {
      state.isCreateTodoLoading = true;
      state.createTodoError = null;
      state.createTodoMessage = false;
    },
    createTodoSuccess(state, action: PayloadAction<any>) {
      state.isCreateTodoLoading = false;
      state.createTodoError = null;
      state.createTodoMessage = "Todo Created Successfully!";
      const todoALL = state.todos;
      const { taskTitle, content, username } = action.payload;
      const todoTaskLength = Object.keys(todoALL.tasks).length;
      const newTaskId = `task-${todoTaskLength + 1}`;
      const newTask = {
        id: newTaskId,
        taskTitle: taskTitle,
        content: content,
        username: username,
      };
      const mainTask = {
        ...todoALL.tasks,
        [newTask.id]: newTask,
      };
      todoALL.tasks = mainTask;

      todoALL.columns["column-1"].taskIds.push(newTask.id);
      state.todos = todoALL;
      state.isCreateTodoLoading = false;
    },
    createTodoError(state, action: PayloadAction<string>) {
      state.isCreateTodoLoading = false;
      state.createTodoError = action.payload;
      state.createTodoMessage = false;
    },
    createEditTodo(state, action: PayloadAction<any>) {
      const { values, editTodo } = action.payload;
      const { task, column } = editTodo;
      const todoAll = state.todos;
      todoAll.tasks[task.id] = {
        ...values,
        id: task.id,
        username: task.username,
      };
      if (column.id !== values.status) {
        const currentColumnId = Object.keys(state.todos.columns).find((colId) =>
          state.todos.columns[colId].taskIds.includes(task.id)
        );
        if (currentColumnId) {
          const currentColumn = { ...state.todos.columns[currentColumnId] };
          const targetColumn = { ...state.todos.columns[values.status] };
          currentColumn.taskIds = currentColumn.taskIds.filter(
            (id) => id !== task.id
          );
          targetColumn.taskIds.push(task.id);
          state.todos.columns[currentColumnId] = currentColumn;
          state.todos.columns[values.status] = targetColumn;
        }
      }
      state.todos = todoAll;
      state.editTodoMessage = "Edit Successfully!";
    },

    getTodoRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getTodoSuccess(state, action: PayloadAction<IData>) {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = null;
    },
    getTodoError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    editTodoData(state, action: PayloadAction<any>) {
      state.editTodo = action.payload;
    },

    deleteTodoData(state, action: PayloadAction<any>) {
      const { task } = action.payload;
      const updatedTasks = { ...state.todos.tasks };
      const { [task.id]: deletedTask, ...remainingTasks } = updatedTasks;
      state.todos.tasks = remainingTasks;
      for (const columnId in state.todos.columns) {
        const column = state.todos.columns[columnId];
        column.taskIds = column.taskIds.filter((taskId) => taskId !== task.id);
      }
    },
    resetMessage(state) {
      state.isCreateTodoLoading = false;
      state.createTodoMessage = false;
      state.editTodoMessage = false;
    },
    onDrag(state, action) {
      state.todos = action.payload;
    },
    resetEdit(state) {
      state.editTodo = false;
    },
  },
});

export const {
  createTodoRequest,
  createTodoSuccess,
  createTodoError,
  resetMessage,
  getTodoRequest,
  getTodoSuccess,
  getTodoError,
  editTodoData,
  onDrag,
  deleteTodoData,
  resetEdit,
  createEditTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
