import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProject } from "../../redux/projectSlice";
import { useNavigate } from "react-router-dom";
import "../../styles/ProjectDetails.css";
import { Eye, Pencil, Trash2, X } from "lucide-react";

export default function ProjectDetailsList() {
  const projects = useSelector((state) => state.project.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewProject, setViewProject] = useState(null);

  const handleEdit = (project) =>
    navigate(`/project-tracker/projects/edit/${project.id}`, {
      state: { project },
    });

  const handleAdd = () => navigate("/project-tracker/projects/add");

  const handleView = (project) => setViewProject(project);

  const closeView = () => setViewProject(null);

  return (
    <div className="project-list-container">
      <h1>Project List</h1>
      <button className="btn-small add-project-btn" onClick={handleAdd}>
        Add Project
      </button>

      <table className="project-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Client Name</th>
            <th>Project Name</th>
            <th>Contact</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="6">No projects</td>
            </tr>
          ) : (
            projects.map((p) => (
              <tr key={p.id}>
                <td className="table-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleView(p)}
                    title="View"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(p)}
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeProject(p.id))}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
                <td>{p.clientName}</td>
                <td>{p.projectName}</td>
                <td>{p.contactPerson}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* View Modal */}
      {viewProject && (
        <div className="view-overlay">
          <div className="view-card">
            <div className="view-header">
              <h3>Project Details</h3>
              <button className="close-btn" onClick={closeView}>
                <X size={16} />
              </button>
            </div>
            <div className="view-content">
              <p>
                <strong>Client Name:</strong> {viewProject.clientName}
              </p>
              <p>
                <strong>Project Name:</strong> {viewProject.projectName}
              </p>
              <p>
                <strong>Contact Person:</strong> {viewProject.contactPerson}
              </p>
              <p>
                <strong>Start Date:</strong> {viewProject.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {viewProject.endDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
