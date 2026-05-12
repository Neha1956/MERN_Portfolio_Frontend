import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // GET PROFILE
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    // CREATE PROFILE (same as set)
    createProfile: (state, action) => {
      state.profile = action.payload;
    },

    // UPDATE PROFILE
    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },

    // DELETE PROFILE
    deleteProfile: (state) => {
      state.profile = null;
    },

    // LOADING (optional)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ERROR (optional)
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  setLoading,
  setError,
} = profileSlice.actions;

export default profileSlice.reducer;
