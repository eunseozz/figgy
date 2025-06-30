import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

const useProjectStore = create((set, get) => ({
  projects: [],

  addProject: (projectName, fileKey) => {
    const { projects } = get();
    const isDuplicate = projects.some((project) => project.fileKey === fileKey);

    if (isDuplicate) return;

    const newProject = {
      projectId: uuidv4(),
      projectName,
      fileKey,
      pages: [],
    };

    set({ projects: [...projects, newProject] });
  },

  getProject: (fileKey) => {
    const { projects } = get();

    return projects.find((project) => project.fileKey === fileKey) || null;
  },

  updateProjects: (fileKey, newPages) => {
    const { projects } = get();
    const updateProjects = projects.map((project) =>
      project.fileKey === fileKey ? { ...project, pages: newPages } : project,
    );

    set({ projects: updateProjects });
  },
}));

export default useProjectStore;
