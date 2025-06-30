import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";

import { getFrameNodeIds, getPngUrlsFromFrames } from "@/api/figma";

const useFigmaImagePages = (fileKey) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const frameIds = await getFrameNodeIds(fileKey);
      const result = await getPngUrlsFromFrames(fileKey, frameIds);

      const decoratedPages = result.map((item) => ({
        ...item,
        icon: <FiFileText />,
      }));

      setPages(decoratedPages);
    };

    if (fileKey) fetchPages();
  }, [fileKey]);

  return pages;
};

export default useFigmaImagePages;
