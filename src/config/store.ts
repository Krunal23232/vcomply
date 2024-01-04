import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import todoReducer from "../slice/todo.slice";
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  auth: authReducer,
  todo: todoReducer,    
 });


const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const persistor = persistStore(store)
