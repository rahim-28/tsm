import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry, updateEntry } from "../../redux/chronoSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/ChronoSheet.css";

export default function ChronoSheetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { entries, auth } = useSelector((state) => state.chrono);

  const params = new URLSearchParams(location.search);
  const editId = params.get("id");
  const editingEntry = entries.find((e) => e.id === Number(editId));

  // ✅ Get last entry of this user only
  const lastEntry = entries
    .filter((e) => e.employeeName === auth?.user?.username)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const [formData, setFormData] = useState({
    date: "",
    projectName: "",
    taskName: "",
    allocatedTime: "",
    timeSpent: "",
    remainingTime: "",
  });

  useEffect(() => {
    if (editingEntry) {
      setFormData(editingEntry);
    } else if (lastEntry && lastEntry.remainingTime > 0) {
      setFormData((prev) => ({
        ...prev,
        allocatedTime:
          Number(prev.allocatedTime || 9) + Number(lastEntry.remainingTime),
      }));
    }
  }, [editingEntry, lastEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const variance =
      Number(formData.allocatedTime) - Number(formData.timeSpent);

    const status =
      formData.remainingTime && Number(formData.remainingTime) > 0
        ? "In Progress"
        : variance < 0
        ? "Overtime"
        : variance === 0
        ? "On Time"
        : "Completed";

    const newEntry = {
      ...formData,
      id: editingEntry ? editingEntry.id : Date.now(),
      employeeName: auth?.user?.username, // ✅ Force logged-in user’s name
      variance,
      status,
      remainingTime: Number(formData.remainingTime || 0),
    };

    if (editingEntry) dispatch(updateEntry(newEntry));
    else dispatch(addEntry(newEntry));

    navigate("/task-tracker/details");
  };

  return (
    <div className="form-container">
      <h2>{editingEntry ? "Edit Entry" : "Add Entry"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          required
        />

        <label>Project Name</label>
        <select
          value={formData.projectName}
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
          required
        >
          <option value="" disabled hidden>
            Select Project
          </option>
          <option value="VMS">VMS</option>
          <option value="EMS">EMS</option>
          <option value="TSM">TSM</option>
        </select>

        <label>Task Name</label>
        <select
          value={formData.taskName}
          onChange={(e) =>
            setFormData({ ...formData, taskName: e.target.value })
          }
          required
        >
          <option value="" disabled hidden>
            Select Task
          </option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Testing">Testing</option>
        </select>

        <label>Allocated Time (hrs)</label>
        <input
          type="number"
          value={formData.allocatedTime}
          onChange={(e) =>
            setFormData({ ...formData, allocatedTime: e.target.value })
          }
          required
        />

        <label>Time Spent (hrs)</label>
        <input
          type="number"
          value={formData.timeSpent}
          onChange={(e) =>
            setFormData({ ...formData, timeSpent: e.target.value })
          }
          required
        />

        <label>Remaining Time (hrs)</label>
        <input
          type="number"
          value={formData.remainingTime}
          onChange={(e) =>
            setFormData({ ...formData, remainingTime: e.target.value })
          }
          placeholder="If task not completed, enter estimated hrs left"
        />

        {/* ✅ Show logged-in username, read-only */}
        <p className="user-info">
          Logged in as: <strong>{auth?.user?.username}</strong>
        </p>

        <button type="submit" className="btn-submit">
          {editingEntry ? "Update Entry" : "Save Entry"}
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/task-tracker/details")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
