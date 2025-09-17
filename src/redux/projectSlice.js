// src/redux/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // all projects
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.list.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    removeProject: (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProject, updateProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
