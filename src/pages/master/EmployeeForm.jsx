import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../../redux/employeeSlice";
import dropdowns from "../../data/dropdowns.json";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/employee.css";

export default function EmployeeForm({
  selectedEmployee,
  setSelectedEmployee,
  onCancel,
}) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const emptyForm = {
    id: "",
    employeeId: "",
    employeeCode: "",
    employeeName: "",
    userName: "",
    userId: "",
    password: "",
    department: "",
    role: "",
    emailId: "",
    mobileNumber: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);

  // load employee data if editing
  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    } else {
      setFormData(emptyForm);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedEmployee) {
      // update existing
      dispatch(updateEmployee(formData));
      setSelectedEmployee(null);
    } else {
      // add new employee with unique id
      dispatch(addEmployee({ ...formData, id: Date.now() }));
    }

    setFormData(emptyForm);
    onCancel();
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <label>Employee ID</label>
      <input
        type="text"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
      />

      <label>Employee Code</label>
      <input
        type="text"
        name="employeeCode"
        value={formData.employeeCode}
        onChange={handleChange}
        required
      />

      <label>Employee Name</label>
      <input
        type="text"
        name="employeeName"
        value={formData.employeeName}
        onChange={handleChange}
        required
      />

      <label>User Name</label>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />

      <label>User ID</label>
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", paddingRight: "10x" }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "-10px",
            top: "40%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <label>Department</label>
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Select Department
        </option>
        {dropdowns.departments.map((dept, i) => (
          <option key={i} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <label>Role</label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Select Role
        </option>
        {dropdowns.roles.map((role, i) => (
          <option key={i} value={role}>
            {role}
          </option>
        ))}
      </select>

      <label>Email ID</label>
      <input
        type="email"
        name="emailId"
        value={formData.emailId}
        onChange={handleChange}
        required
      />

      <label>Mobile Number</label>
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
