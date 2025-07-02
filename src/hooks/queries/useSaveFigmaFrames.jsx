import { useMutation } from "@tanstack/react-query";
import { FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getFigmaImageUrls } from "@/api/figma";
import useProjectStore from "@/stores/useProjectStore";

const useSaveFigmaFrames = ({ onSuccessAfterSave } = {}) => {
  const { fileKey } = useParams();
  const updateProjects = useProjectStore((s) => s.updateProjects);

  return useMutation({
    mutationFn: (frames) => getFigmaImageUrls(fileKey, frames),
    onSuccess: (result) => {
      const decoratedPages = result.map((item) => ({
        ...item,
        icon: <FiFileText />,
      }));

      decoratedPages.forEach((page) => {
        const img = new Image();

        img.src = page.imageUrl;
      });

      const initialGroups = [
        { title: "PC", minWidth: 1024, items: decoratedPages },
        { title: "TABLET", minWidth: 768, items: [] },
        { title: "MOBILE", minWidth: 0, items: [] },
      ];

      updateProjects(fileKey, initialGroups);

      if (onSuccessAfterSave) onSuccessAfterSave();
    },
    onError: (err) => {
      console.error("프레임 저장 실패", err);
    },
  });
};

export default useSaveFigmaFrames;
