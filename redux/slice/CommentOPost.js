"use client"; 

import { createSlice } from "@reduxjs/toolkit";

const commentsData = {
  id:'',
  autheremail:'',
  post_media:'',
  title:'',
  description:'',
  like:'',
  dislike:'',
  dateandtime:'',
};

export const counterSlice = createSlice({
  name: "Login",
  initialState:commentsData,
  reducers: {

    // set client data
    setClientData: (state,payload) => {
        const {name,email,image}=payload.payload;
        state.name=name;
        state.email=email;
        state.image=image;
    },
   
  },
});

export const { setClientData } = counterSlice.actions

export default counterSlice.reducer;