import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { chromeStorage } from "@/utils/chromeStorage";

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],

      addProject: (projectName, fileKey) => {
        const { projects } = get();
        const isDuplicate = projects.some(
          (project) => project.fileKey === fileKey,
        );

        if (isDuplicate) return;

        const newProject = {
          projectId: uuidv4(),
          projectName,
          fileKey,
          pages: [],
        };

        set({ projects: [...projects, newProject] });
      },

      updateProjects: (fileKey, newPages) => {
        const { projects } = get();
        const updateProjects = projects.map((project) =>
          project.fileKey === fileKey
            ? { ...project, pages: newPages }
            : project,
        );

        set({ projects: updateProjects });
      },
    }),
    {
      name: "project-storage",
      storage: chromeStorage,
    },
  ),
);

export const selectedProject = (fileKey) => (state) =>
  state.projects.find((project) => project.fileKey === fileKey) || null;

export default useProjectStore;
