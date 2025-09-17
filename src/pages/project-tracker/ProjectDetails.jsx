// src/pages/project-tracker/ProjectDetails.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ProjectDetailsList from "./ProjectDetailsList";
import ProjectDetailsForm from "./ProjectDetailsForm";

const ProjectDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  // Show form if route contains "add" or "edit"
  if (location.pathname.includes("add") || location.pathname.includes("edit")) {
    return <ProjectDetailsForm />;
  }

  // Default: show project list
  return <ProjectDetailsList />;
};

export default ProjectDetails;

