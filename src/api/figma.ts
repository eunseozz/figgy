import { v4 as uuidv4 } from "uuid";

import { fetcher } from "@/services/fetcher";

export type FigmaFrame = {
  id: string;
  name: string;
};

export type FigmaImageResult = {
  id: string;
  label: string;
  nodeId: string;
  imageUrl: string;
};

export const getFigmaFile = async (fileKey: string): Promise<unknown> => {
  return await fetcher(`https://api.figma.com/v1/files/${fileKey}`);
};

export const getFigmaImageUrls = async (
  fileKey: string,
  frames: FigmaFrame[],
): Promise<FigmaImageResult[]> => {
  const idsParam = frames.map((f) => encodeURIComponent(f.id)).join(",");

  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=svg&scale=1`;
  const data: { images?: Record<string, string> } = await fetcher(url);

  if (!data.images) return [];

  const result: FigmaImageResult[] = frames
    .map((frame) => ({
      id: uuidv4(),
      label: frame.name,
      nodeId: frame.id,
      imageUrl: data.images?.[frame.id] || null,
    }))
    .filter((item): item is FigmaImageResult => item.imageUrl !== null);

  return result;
};

export const checkAccessToken = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch("https://api.figma.com/v1/me", {
      headers: {
        "X-FIGMA-TOKEN": token,
      },
    });

    return res.ok;
  } catch {
    return false;
  }
};
