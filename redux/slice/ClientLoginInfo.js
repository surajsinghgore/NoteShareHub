"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const clientData = {
  name:'',
  email:'',
  image:'',
};

export const counterSlice = createSlice({
  name: "Login",
  initialState:clientData,
  reducers: {

    // set client data
    setClientData: (state,payload) => {
        const {name,email,image}=payload.payload;
        state.name=name;
        state.email=email;
        state.image=image;
    },
    // get Client Data
   
  },
});

export const { setClientData } = counterSlice.actions

export default counterSlice.reducer;