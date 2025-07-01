import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const useInitPageGroups = (pages) => {
  const { fileKey } = useParams();

  const project = useProjectStore(selectedProject(fileKey));
  const updateProjects = useProjectStore((state) => state.updateProjects);

  const isInitTarget = project && project.pages.length === 0;

  useEffect(() => {
    if (isInitTarget && pages.length > 0) {
      const initialGroups = [
        { title: "PC", minWidth: 1024, items: pages },
        { title: "TABLET", minWidth: 768, items: [] },
        { title: "MOBILE", minWidth: 0, items: [] },
      ];

      updateProjects(fileKey, initialGroups);
    }
  }, [isInitTarget, pages]);
};

export default useInitPageGroups;
