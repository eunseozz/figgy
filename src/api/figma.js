import { v4 as uuidv4 } from "uuid";

import useUserStore from "@/stores/useUserStore";

export const getFrameNodeIds = async (fileKey) => {
  const accessToken = useUserStore.getState().accessToken;

  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-FIGMA-TOKEN": accessToken,
    },
  });

  const data = await res.json();

  if (!data.document || !data.document.children) {
    return [];
  }

  const frames = [];

  data.document.children.forEach((page) => {
    if (page.children) {
      page.children.forEach((node) => {
        if (node.type === "FRAME") {
          frames.push({
            id: node.id,
            name: node.name,
          });
        }
      });
    }
  });

  return frames;
};

export const getPngUrlsFromFrames = async (fileKey, frames) => {
  const accessToken = useUserStore.getState().accessToken;

  const ids = frames.map((frame) => frame.id);
  const idsParam = ids.map(encodeURIComponent).join(",");
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=png`;

  const res = await fetch(url, {
    headers: {
      "X-FIGMA-TOKEN": accessToken,
    },
  });

  const data = await res.json();

  if (!data.images) {
    return [];
  }

  const result = frames
    .map((frame) => ({
      id: uuidv4(),
      label: frame.name,
      imageUrl: data.images[frame.id] || null,
    }))
    .filter((item) => item.imageUrl !== null);

  return result;
};
