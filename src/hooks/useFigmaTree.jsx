import { useEffect, useState } from "react";

import { getFigmaFile } from "@/api/figma";
import { transformToTree } from "@/utils/figma";

const useFigmaTree = (fileKey) => {
  const [tree, setTree] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileKey) return;

    const fetchTree = async () => {
      try {
        setIsLoading(true);
        const data = await getFigmaFile(fileKey);
        const tree = transformToTree(data);

        setTree(tree);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTree();
  }, [fileKey]);

  return { tree, isLoading, error };
};

export default useFigmaTree;
