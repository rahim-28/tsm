import React, { useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import "../../styles/TaskAllocation.css";

export default function TaskDetails({ tasks, onAdd, onDelete, onEdit }) {
  const [viewTask, setViewTask] = useState(null);

  return (
    <div className="task-details">
      <div className="task-header">
        <h2>Task Allocation</h2>
        <button className="add-task-btn" onClick={onAdd}>Add Task</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Department</th>
            <th>Employee Name</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Assigned By</th>
            <th>Allocated Time</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={new Date(task.endDate) < new Date() ? "overdue" : ""}>
              <td className="task-actions">
                <button className="action-btn view-btn" title="View" onClick={() => setViewTask(task)}><Eye size={16} /></button>
                <button className="action-btn edit-btn" title="Edit" onClick={() => onEdit(task)}><Pencil size={16} /></button>
                <button className="action-btn delete-btn" title="Delete" onClick={() => onDelete(task.id)}><Trash2 size={16} /></button>
              </td>
              <td>{task.department}</td>
              <td>{task.employee}</td>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.assignedBy}</td>
              <td>{task.allocatedTime}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewTask && (
        <div className="modal-overlay">
          <div className="modal-content card-view">
            <div className="modal-header">
              <h2>Task Information</h2>
              <button className="close-btn" onClick={() => setViewTask(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {Object.entries(viewTask).map(([key, value]) => (
                <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
              ))}
            </div>
            <div className="modal-footer">
              <button className="close-footer-btn" onClick={() => setViewTask(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
