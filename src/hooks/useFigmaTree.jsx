import { useEffect, useState } from "react";

import { getFigmaFile, transformToTree } from "@/api/figma";

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

        console.log("data", data);
        const tree = transformToTree(data);

        setTree(tree);
      } catch (err) {
        setError(err);
        console.error("useFigmaTree 에러:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTree();
  }, [fileKey]);

  console.log("tree", tree);

  return { tree, isLoading, error };
};

export default useFigmaTree;
