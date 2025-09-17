import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import "../../styles/employee.css";

const Employee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowForm(false);
  };

  return (
    <div className="employee-container">
      <h1>Employee Management</h1>
      
      {!showForm ? (
        <>
          <div className="employee-header">
            <button 
              className="add-employee-btn"
              onClick={handleAddNew}
            >
              Add New Employee
            </button>
          </div>
          
          <EmployeeTable 
            setSelectedEmployee={handleEdit}
          />
        </>
      ) : (
        <div className="employee-form-section">
          <h2>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>
          <EmployeeForm 
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Employee;