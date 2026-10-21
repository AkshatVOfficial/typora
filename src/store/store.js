import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
 
const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    post: postReducer,
  },
});

export default store;