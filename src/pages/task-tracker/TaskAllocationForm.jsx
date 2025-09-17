import React from "react";
import { useSelector } from "react-redux";
import "../../styles/TaskAllocation.css";

export default function TaskForm({ formData, setFormData, onSave, onCancel }) {
  // ✅ Get employees from Redux
  const employees = useSelector((state) => state.employee.employees);

  return (
    <div className="task-form">
      <h2>Task Allocation</h2>

      <div className="form-group">
        <label>Department</label>
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        >
          <option value="" disabled hidden>Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div className="form-group">
        <label>Employee Name</label>
        <select
          value={formData.employee}
          onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
        >
          <option value="" disabled hidden>Select Employee</option>
          {/* ✅ Populate dynamically */}
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employeeName}>
              {emp.employeeName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Task Name</label>
        <select
          value={formData.taskName}
          onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
        >
          <option value="" disabled hidden>Select Task</option>
          <option value="Prepare Report">Prepare Report</option>
          <option value="Client Meeting">Client Meeting</option>
          <option value="Update React Components">Update React Components</option>
          <option value="Fix Login Authentication Bug">Fix Login Authentication Bug</option>
        </select>
      </div>

      <div className="form-group">
        <label>Task Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Assigned By</label>
        <select
          value={formData.assignedBy}
          onChange={(e) => setFormData({ ...formData, assignedBy: e.target.value })}
        >
          <option value="" disabled hidden>Select</option>
          <option value="Manager">Manager</option>
          <option value="Team Leader">Team Leader</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <div className="form-group">
        <label>Allocated Time</label>
        <input
          type="text"
          value={formData.allocatedTime}
          onChange={(e) => setFormData({ ...formData, allocatedTime: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        />
      </div>

      <div className="button-group">
        <button className="save" onClick={onSave}>Save</button>
        <button className="cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
