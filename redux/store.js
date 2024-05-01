"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientLoginReducer from "./slice/ClientLoginInfo";
import ClientLoginStateReducer from "./slice/ClientLoginState";
import ReloadPostsStateReducer from "./slice/ReloadPostsState";
import  NotificationState  from "./slice/NotificationStatus";
// manage reducer
const rootReducer = combineReducers({
  clientLoginInfo: clientLoginReducer,
  clientLoginState: ClientLoginStateReducer,
  PostReloadState: ReloadPostsStateReducer,
  notificationState: NotificationState
});

export const store = configureStore({
  reducer: rootReducer,
});
