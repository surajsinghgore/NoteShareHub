"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import clientLoginReducer from "./slice/ClientLoginInfo";

// manage reducer
const rootReducer = combineReducers({
  clientLoginInfo: clientLoginReducer

},);

export const store = configureStore({
  reducer: rootReducer,

 });
