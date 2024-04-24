"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const postState = {
  state: false,
};

export const counterSlice = createSlice({
  name: "PostsReloadState",

  initialState: postState,
  reducers: {
    // set client data
    PostReloadState: (state, payload) => {
      // set login state

      state.state = payload.payload;
   
    },
  },
});

export const { PostReloadState } = counterSlice.actions;

export default counterSlice.reducer;
