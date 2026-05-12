import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../api/axiosAPI";

// Async Thunk - GET PROJECTS
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get("/projects/get");
      return res.data.projects;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.push(action.payload);
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },

    updateProjectState: (state, action) => {
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id
          ? action.payload
          : project
      );
    },
  },
  extraReducers: (builder) => {
    // GET PROJECTS
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProjects,
  addProject,
  removeProject,
  updateProjectState,
} = projectSlice.actions;

export default projectSlice.reducer;
