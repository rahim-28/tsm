import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry, logout } from "../../redux/chronoSlice";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye, X } from "lucide-react";
import "../../styles/ChronoSheet.css";

export default function ChronoSheetTable() {
  const { entries, auth } = useSelector(state => state.chrono);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewEntry, setViewEntry] = useState(null);

  // ✅ Only show entries of the logged-in user
  const userEntries = auth?.user
    ? entries.filter(e => e.employeeName === auth.user.username)
    : [];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>
          {auth?.user ? `${auth.user.username}'s Chrono Sheet` : "Chrono Sheet"}
        </h2>
        <div>
          <button
            className="btn-small"
            onClick={() => navigate("/task-tracker/details/add")}
          >
            Add Entry
          </button>
          <button
            className="btn-small logout"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Date</th>
            <th>Project</th>
            <th>Task</th>
            <th>Allocated Time</th>
            <th>Time Spent</th>
            <th>Variance</th>
            <th>Remaining Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userEntries.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No entries found
              </td>
            </tr>
          ) : (
            userEntries.map(entry => (
              <tr key={entry.id}>
                <td className="action-buttons">
                  <button
                    className="action-btn view-btn"
                    onClick={() => setViewEntry(entry)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() =>
                      navigate(`/task-tracker/details/add?id=${entry.id}`)
                    }
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => dispatch(deleteEntry(entry.id))}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
                <td>{entry.date}</td>
                <td>{entry.projectName}</td>
                <td>{entry.taskName}</td>
                <td>{entry.allocatedTime} hrs</td>
                <td>{entry.timeSpent} hrs</td>
                <td>{entry.variance} hrs</td>
                <td>{entry.remainingTime} hrs</td>
                <td>{entry.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {viewEntry && (
        <div className="view-overlay" onClick={() => setViewEntry(null)}>
          <div className="view-card" onClick={e => e.stopPropagation()}>
            <div className="view-header">
              <h3>Entry Details</h3>
              <button
                className="close-btn"
                onClick={() => setViewEntry(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="view-content">
              <p><strong>Date:</strong> {viewEntry.date}</p>
              <p><strong>Project:</strong> {viewEntry.projectName}</p>
              <p><strong>Task:</strong> {viewEntry.taskName}</p>
              <p><strong>Allocated Time:</strong> {viewEntry.allocatedTime} hrs</p>
              <p><strong>Time Spent:</strong> {viewEntry.timeSpent} hrs</p>
              <p><strong>Variance:</strong> {viewEntry.variance} hrs</p>
              <p><strong>Remaining Time:</strong> {viewEntry.remainingTime} hrs</p>
              <p><strong>Status:</strong> {viewEntry.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
