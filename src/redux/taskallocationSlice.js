import { createSlice } from "@reduxjs/toolkit";
import initialTasks from "../services/taskAllocationService.js";

// LocalStorage helpers
const loadTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : initialTasks;
};
const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadTasks(),
    editTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: state.list.length + 1, ...action.payload };
      state.list.push(newTask);
      saveTasks(state.list);
    },
    updateTask: (state, action) => {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
        saveTasks(state.list);
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      saveTasks(state.list);
    },
    setEditTask: (state, action) => { state.editTask = action.payload; },
    clearEditTask: (state) => { state.editTask = null; },
  },
});

export const { addTask, updateTask, deleteTask, setEditTask, clearEditTask } = taskSlice.actions;
export default taskSlice.reducer;
