// src/pages/project-tracker/ProjectDetailsForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../../redux/projectSlice";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectDetailsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projectToEdit = location.state?.project;

  const [project, setProject] = useState({
    clientName: "",
    projectName: "",
    contactPerson: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (projectToEdit) setProject(projectToEdit);
  }, [projectToEdit]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.id) {
      dispatch(updateProject(project));
    } else {
      const newProject = { ...project, id: Date.now() };
      dispatch(addProject(newProject));
    }
    navigate("/project-tracker/projects");
  };

  return (
    <div className="project-form-container">
      <h1>{project.id ? "Edit Project" : "Add Project"}</h1>
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          name="clientName"
          placeholder="Client Name"
          value={project.clientName}
          onChange={handleChange}
          required
        />
        <input
          name="projectName"
          placeholder="Project Name"
          value={project.projectName}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={project.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          name="startDate"
          type="date"
          value={project.startDate}
          onChange={handleChange}
          required
        />
        <input
          name="endDate"
          type="date"
          value={project.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit">{project.id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ProjectDetailsForm;
