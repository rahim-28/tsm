import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import chronoReducer from "./chronoSlice";   
import clientsReducer from "./clientsSlice"; 
import employeeReducer from "./employeeSlice"; 

// ✅ Import Task Allocation slice
import taskReducer from "./taskallocationSlice"; 

// Load from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("chronoState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// When adding a new employee
const handleAddEmployee = (employee) => {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
};

// Save to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("chronoState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    chrono: chronoReducer,
    clients: clientsReducer,
    employee: employeeReducer,
    project: projectReducer,
    tasks: taskReducer, // ✅ Added Task Allocation slice
  },
  preloadedState,
});

// Subscribe to save changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
