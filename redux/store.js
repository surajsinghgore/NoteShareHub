"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientLoginReducer from "./slice/ClientLoginInfo";
import ClientLoginStateReducer from "./slice/ClientLoginState";
// manage reducer
const rootReducer = combineReducers({
  clientLoginInfo: clientLoginReducer,
  clientLoginState: ClientLoginStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
