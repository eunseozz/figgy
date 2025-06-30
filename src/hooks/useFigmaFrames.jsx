import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getFrameNodeIds, getPngUrlsFromFrames } from "@/api/figma";

const useFigmaFrames = () => {
  const { fileKey } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPngImages = async () => {
      const frameIds = await getFrameNodeIds(fileKey);
      const result = await getPngUrlsFromFrames(fileKey, frameIds);

      setPages(
        result.map((item) => ({
          ...item,
          icon: <FiFileText />,
        })),
      );
    };

    fetchPngImages();
  }, []);

  return pages;
};

export default useFigmaFrames;
