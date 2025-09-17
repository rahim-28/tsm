import { createSlice } from "@reduxjs/toolkit";

const chronoSlice = createSlice({
  name: "chrono",
  initialState: {
    entries: [],
    auth: { user: null },
  },
  reducers: {
    login: (state, action) => {
      state.auth.user = action.payload.user;
    },
    logout: (state) => {
      state.auth.user = null;
    },
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action) => {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.entries[index] = action.payload;
    },
    deleteEntry: (state, action) => {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
  },
});

export const { login, logout, addEntry, updateEntry, deleteEntry } =
  chronoSlice.actions;
export default chronoSlice.reducer;
