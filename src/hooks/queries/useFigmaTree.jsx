import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import { transformToTree } from "@/utils/figma";

const useFigmaTree = () => {
  const { fileKey } = useParams();

  return useSuspenseQuery({
    queryKey: ["figmaTree", fileKey],
    queryFn: async () => {
      const data = await getFigmaFile(fileKey);

      return transformToTree(data);
    },
    enabled: !!fileKey,
  });
};

export default useFigmaTree;
