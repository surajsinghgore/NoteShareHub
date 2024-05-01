"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const reloadDeleteStatus = {
  state: false,
};

export const counterSlice = createSlice({
  name: "DeletePostReload",

  initialState: reloadDeleteStatus,
  reducers: {
    // set client data
    DeletePostReload: (state, payload) => {
      // set login state

      state.state = payload.payload;
   
        state.state = true;
    
    },
  },
});

export const { DeletePostReload } = counterSlice.actions;

export default counterSlice.reducer;
