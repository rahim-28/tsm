import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // ⚠️ must be an array

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteClient: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
