import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getFigmaImageUrls } from "@/api/figma";
import useProjectStore from "@/stores/useProjectStore";

const useSaveFigmaFrames = ({ onSuccessAfterSave } = {}) => {
  const { fileKey } = useParams();
  const updateProjects = useProjectStore((state) => state.updateProjects);

  return useMutation({
    mutationFn: (frames) => getFigmaImageUrls(fileKey, frames),
    onSuccess: (pages) => {
      pages.forEach((page) => {
        const img = new Image();

        img.src = page.imageUrl;
      });

      const initialGroups = [
        { title: "PC", minWidth: 1024, items: pages },
        { title: "TABLET", minWidth: 768, items: [] },
        { title: "MOBILE", minWidth: 0, items: [] },
      ];

      updateProjects(fileKey, initialGroups);

      if (onSuccessAfterSave) onSuccessAfterSave();
    },
    onError: (error) => {
      console.error("프레임 저장 실패", error);
    },
  });
};

export default useSaveFigmaFrames;
