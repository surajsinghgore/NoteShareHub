"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const NotificationState = {
  state: false,
};

export const counterSlice = createSlice({
  name: "notificationState",

  initialState: NotificationState,
  reducers: {
    // set client data
    notificationState: (state, payload) => {
      // set login state

      state.state = payload.payload;
   
        state.state = true;
    
    },
  },
});

export const { notificationState } = counterSlice.actions;

export default counterSlice.reducer;
