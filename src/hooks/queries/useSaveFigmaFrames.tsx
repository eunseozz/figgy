import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  getFigmaImageUrls,
  type FigmaImageResult,
  type FigmaFrame,
} from "@/api/figma";
import useProjectStore from "@/stores/useProjectStore";

type UseSaveFigmaFramesOptions = {
  onSuccessAfterSave?: () => void;
};

const useSaveFigmaFrames = ({
  onSuccessAfterSave,
}: UseSaveFigmaFramesOptions = {}) => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const updateProjects = useProjectStore((state) => state.updateProjects);

  return useMutation<FigmaImageResult[], Error, FigmaFrame[]>({
    mutationFn: (frames: FigmaFrame[]) => {
      if (!fileKey) throw new Error("fileKey is missing");
      return getFigmaImageUrls(fileKey, frames);
    },
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

      if (!fileKey) throw new Error("fileKey is missing");
      updateProjects(fileKey, initialGroups);

      if (onSuccessAfterSave) onSuccessAfterSave();
    },
    onError: (error) => {
      console.error("프레임 저장 실패", error);
    },
  });
};

export default useSaveFigmaFrames;
