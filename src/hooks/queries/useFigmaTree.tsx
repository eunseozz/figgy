import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import { transformToTree } from "@/utils/figma";
import type { FigmaNode } from "@/hooks/useCheckboxTree";

const useFigmaTree = () => {
  const { fileKey } = useParams<{ fileKey: string }>();

  return useSuspenseQuery<FigmaNode[]>({
    queryKey: ["figmaTree", fileKey],
    queryFn: async () => {
      if (!fileKey) {
        return [];
      }
      const data = await getFigmaFile(fileKey);
      return transformToTree(data);
    },
  });
};

export default useFigmaTree;
