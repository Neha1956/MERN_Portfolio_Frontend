import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import authReducer from "./authSlice";
import ProfileReducer from "./profileSlice";
import messageSlice from "./messageSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
    projects: projectReducer,
     profile: ProfileReducer,
     message:messageSlice,

  },
});
