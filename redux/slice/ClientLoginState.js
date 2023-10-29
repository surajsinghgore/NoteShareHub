"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const clientState = {
  state: false,
};

export const counterSlice = createSlice({
  name: "LoginState",

  initialState: clientState,
  reducers: {
    // set client data
    clientLoginState: (state, payload) => {
    // set login state
 
    
        state.state = payload.payload;
      
    },
  },
});

export const { clientLoginState } = counterSlice.actions;

export default counterSlice.reducer;
