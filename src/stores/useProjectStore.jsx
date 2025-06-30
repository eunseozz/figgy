import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

const useProjectStore = create((set, get) => ({
  projects: [],

  addProject: (projectName, fileKey) => {
    const { projects } = get();
    const exists = projects.some((project) => project.fileKey === fileKey);

    if (exists) return;

    const newProject = {
      projectId: uuidv4(),
      projectName,
      fileKey,
      projectPages: [],
    };

    set({ projects: [...projects, newProject] });
  },

  getProjectByFileKey: (fileKey) => {
    const { projects } = get();

    return projects.find((p) => p.fileKey === fileKey) || null;
  },

  updateProjectPagesByFileKey: (fileKey, newProjectPages) => {
    const { projects } = get();
    const updated = projects.map((project) =>
      project.fileKey === fileKey
        ? { ...project, projectPages: newProjectPages }
        : project,
    );

    set({ projects: updated });
  },
}));

export default useProjectStore;
