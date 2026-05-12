import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../api/axiosAPI";

// Async Thunk - POST MESSAGE
export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post("/contact/send", messageData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

// Async Thunk - GET MESSAGES
export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get("/contact/messages");
      return res.data.messages;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

// Async Thunk - DELETE MESSAGE
export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.delete(`/contact/delete/${messageId}`);
      return messageId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete message"
      );
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // POST MESSAGE
    builder
      .addCase(postMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.messages.unshift(action.payload);
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // GET MESSAGES
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE MESSAGE
    builder
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = messageSlice.actions;
export default messageSlice.reducer;
