export let projectsDB = [];

export const fetchProjects = () =>
  new Promise(resolve => setTimeout(() => resolve([...projectsDB]), 200));

export const saveProject = (project) =>
  new Promise(resolve => {
    setTimeout(() => {
      const newProject = { ...project, id: Date.now() };
      projectsDB.push(newProject);
      resolve(newProject);
    }, 200);
  });

export const deleteProject = (id) =>
  new Promise(resolve => {
    setTimeout(() => {
      projectsDB = projectsDB.filter(p => p.id !== id);
      resolve(id);
    }, 200);
  });

export const editProject = (project) =>
  new Promise(resolve => {
    setTimeout(() => {
      const index = projectsDB.findIndex(p => p.id === project.id);
      if (index >= 0) projectsDB[index] = project;
      resolve(project);
    }, 200);
  });
