import { createSlice } from "@reduxjs/toolkit";

// Load employees from localStorage if available
let savedEmployees = JSON.parse(localStorage.getItem("employees"));
if (!savedEmployees) {
  savedEmployees = []; // start with empty array if nothing in localStorage
  localStorage.setItem("employees", JSON.stringify(savedEmployees));
}

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employees: savedEmployees },

  reducers: {
    // ➕ Add Employee
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    // ✏️ Update Employee
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex(
        (emp) => emp.id === updatedEmployee.id
      );
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
        localStorage.setItem("employees", JSON.stringify(state.employees));
      }
    },

    // ❌ Delete Employee
    deleteEmployee: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((emp) => emp.id !== id);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

// Export actions
export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;

// Export reducer
export default employeeSlice.reducer;
