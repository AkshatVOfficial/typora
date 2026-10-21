import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { getPosts } = postSlice.actions;
export default postSlice.reducer;
