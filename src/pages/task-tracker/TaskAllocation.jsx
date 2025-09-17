import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TaskDetails from "./TaskAllocationTable";
import TaskForm from "./TaskAllocationForm";

// Redux slice
import {
  addTask,
  updateTask,
  deleteTask,
  setEditTask,
  clearEditTask,
} from "../../redux/taskallocationSlice";

export default function TaskScreen() {
  const { list: tasks, editTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [page, setPage] = useState("view");

  const initialFormState = {
    department: "",
    employee: "",
    taskName: "",
    description: "",
    assignedBy: "",
    allocatedTime: "",
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Load editTask into form if exists
  useEffect(() => {
    if (editTask) {
      setFormData(editTask);
      setPage("input");
    }
  }, [editTask]);

  const handleSave = () => {
    if (editTask) {
      dispatch(updateTask({ id: editTask.id, ...formData }));
      dispatch(clearEditTask());
    } else {
      dispatch(addTask(formData));
    }
    setFormData(initialFormState);
    setPage("view");
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    dispatch(setEditTask(task));
  };

  return (
    <div>
      {page === "view" && (
        <TaskDetails
          tasks={tasks}
          onAdd={() => {
            dispatch(clearEditTask());
            setFormData(initialFormState);
            setPage("input");
          }}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {page === "input" && (
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={() => {
            dispatch(clearEditTask());
            setPage("view");
          }}
        />
      )}
    </div>
  );
}
