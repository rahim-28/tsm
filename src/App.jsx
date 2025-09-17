// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Users, Layers, Clipboard, Shield, BarChart } from "lucide-react";
import LoginPage from "./pages/LoginPage";

// Master Screens
import Employee from "./pages/master/Employee";          // ✅ now loads Employee.jsx (with form + table)
import Department from "./pages/master/Department";
import ChangePassword from "./pages/master/ChangePassword";

// Project Tracker Screens
import ProjectDetails from "./pages/project-tracker/ProjectDetails";
import ClientTable from "./pages/project-tracker/ClientTable";
import ClientForm from "./pages/project-tracker/ClientForm";

// Task Tracker Screens
import TaskCreation from "./pages/task-tracker/TaskCreation";
import TaskAllocation from "./pages/task-tracker/TaskAllocation";
import ChronoSheetTable from "./pages/task-tracker/ChronoSheetTable";
import ChronoSheetForm from "./pages/task-tracker/ChronoSheetForm";

// Role Screens
import Roles from "./pages/role/Roles";
import RoleMapping from "./pages/role/RoleMapping";

// Analytics Screens
import ProjectAnalytics from "./pages/analytics/ProjectAnalytics";
import EmployeeAnalytics from "./pages/analytics/EmployeeAnalytics";

import "./App.css";

// ✅ Protected Route Wrapper
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.chrono.auth);
  return auth?.user ? children : <Navigate to="/" replace />;
}

function App() {
  const [openModule, setOpenModule] = useState(""); // tracks which module's submenu is open
  const auth = useSelector((state) => state.chrono.auth);

  const toggleModule = (module) => {
    setOpenModule(openModule === module ? "" : module);
  };

  const submenus = {
    master: [
      { name: "Employee", path: "/master/employees" },   // ✅ Employee screen route
      { name: "Department", path: "/master/departments" },
      { name: "Change Password", path: "/master/change-password" },
    ],
    project: [
      { name: "Project Details", path: "/project-tracker/projects" },
      { name: "Client Details", path: "/project-tracker/clients" },
    ],
    task: [
      { name: "Task Creation", path: "/task-tracker/create" },
      { name: "Task Allocation", path: "/task-tracker/allocate" },
      { name: "Task Details", path: "/task-tracker/details" }, // ✅ ChronoSheetTable
    ],
    role: [
      { name: "Roles", path: "/role/roles" },
      { name: "Role Mapping", path: "/role/mapping" },
    ],
    analytics: [
      { name: "Project Analytics", path: "/analytics/projects" },
      { name: "Employee Analytics", path: "/analytics/employees" },
    ],
  };

  return (
    <Router>
      {/* ✅ If not logged in, show only LoginPage */}
      {!auth?.user ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div className="app-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul className="sidebar-menu">
              <li>
                <Link to="/dashboard" className="icon-link">
                  <Home size={24} />
                </Link>
              </li>
              <li>
                <button className="icon-link" onClick={() => toggleModule("master")}>
                  <Users size={24} />
                </button>
              </li>
              <li>
                <button className="icon-link" onClick={() => toggleModule("project")}>
                  <Layers size={24} />
                </button>
              </li>
              <li>
                <button className="icon-link" onClick={() => toggleModule("task")}>
                  <Clipboard size={24} />
                </button>
              </li>
              <li>
                <button className="icon-link" onClick={() => toggleModule("role")}>
                  <Shield size={24} />
                </button>
              </li>
              <li>
                <button className="icon-link" onClick={() => toggleModule("analytics")}>
                  <BarChart size={24} />
                </button>
              </li>
            </ul>
          </aside>

          {/* Submenu side panel */}
          {openModule && (
            <aside className="submenu-panel">
              <ul>
                {submenus[openModule].map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} onClick={() => setOpenModule("")}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/dashboard" element={<h1>Dashboard Screen</h1>} />

              {/* Master */}
              <Route path="/master/employees" element={<Employee />} />  {/* ✅ employee form+table */}
              <Route path="/master/departments" element={<Department />} />
              <Route path="/master/change-password" element={<ChangePassword />} />

          {/* Project Tracker */}
              <Route path="/project-tracker/projects" element={<ProjectDetails />} />
              <Route path="/project-tracker/projects/add" element={<ProjectDetails />} />
              <Route path="/project-tracker/projects/edit/:id" element={<ProjectDetails />} />
              <Route path="/project-tracker/clients" element={<ClientTable />} />
              <Route path="/project-tracker/clients/add" element={<ClientForm />} />
              <Route path="/project-tracker/clients/edit/:id" element={<ClientForm />} />

              {/* Task Tracker */}
              <Route path="/task-tracker/create" element={<TaskCreation />} />
              <Route path="/task-tracker/allocate" element={<TaskAllocation />} />
              <Route path="/task-tracker/details" element={<ChronoSheetTable />} />
              <Route path="/task-tracker/details/add" element={<ChronoSheetForm />} />
              <Route path="/task-tracker/details/edit/:id" element={<ChronoSheetForm />} />

              {/* Role */}
              <Route path="/role/roles" element={<Roles />} />
              <Route path="/role/mapping" element={<RoleMapping />} />

              {/* Analytics */}
              <Route path="/analytics/projects" element={<ProjectAnalytics />} />
              <Route path="/analytics/employees" element={<EmployeeAnalytics />} />

              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
