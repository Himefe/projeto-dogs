import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import localStorage from "./middlewares/localStorage";
import { photoReducer } from "./photo";
import token from "./token";
import user from "./user";
import feed from "./feed";
import uiSlice from "./ui";
import photoPostSlice from "./photoPost";

const reducer = combineReducers({
  photoReducer,
  token,
  user,
  feed,
  uiSlice,
  photoPostSlice,
});

const middlewares = [...getDefaultMiddleware(), localStorage];

export const store = configureStore({ reducer, middleware: middlewares });
