import { v4 as uuidv4 } from "uuid";

import { fetcher } from "@/services/fetcher";

export const getFigmaFile = async (fileKey) => {
  return await fetcher(`https://api.figma.com/v1/files/${fileKey}`);
};

export const getFigmaImageUrls = async (fileKey, frames) => {
  const idsParam = frames.map((f) => encodeURIComponent(f.id)).join(",");

  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=svg&scale=1`;
  const data = await fetcher(url);

  if (!data.images) return [];

  const result = frames
    .map((frame) => ({
      id: uuidv4(),
      label: frame.name,
      nodeId: frame.id,
      imageUrl: data.images[frame.id] || null,
    }))
    .filter((item) => item.imageUrl !== null);

  return result;
};
