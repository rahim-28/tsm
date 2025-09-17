import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../../redux/employeeSlice";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import "../../styles/employee.css";


export default function EmployeeTable({ setSelectedEmployee }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [viewEmployee, setViewEmployee] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Employee ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email Id</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <button
                    className="action-btn view-btn"
                    title="View"
                    onClick={() => setViewEmployee(emp)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="action-btn edit-btn"
                    title="Edit"
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    title="Delete"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeCode}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.userName}</td>
                <td>{emp.userId}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.emailId}</td>
                <td>{emp.mobileNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {viewEmployee && (
        <div className="modal-overlay">
          <div className="modal-content card-view">
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button
                className="close-btn"
                onClick={() => setViewEmployee(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Employee ID:</strong> {viewEmployee.employeeId}</p>
              <p><strong>Employee Code:</strong> {viewEmployee.employeeCode}</p>
              <p><strong>Name:</strong> {viewEmployee.employeeName}</p>
              <p><strong>User Name:</strong> {viewEmployee.userName}</p>
              <p><strong>User ID:</strong> {viewEmployee.userId}</p>
              <p><strong>Department:</strong> {viewEmployee.department}</p>
              <p><strong>Role:</strong> {viewEmployee.role}</p>
              <p><strong>Email Id:</strong> {viewEmployee.emailId}</p>
              <p><strong>Mobile Number:</strong> {viewEmployee.mobileNumber}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
