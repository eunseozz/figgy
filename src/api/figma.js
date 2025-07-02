import { v4 as uuidv4 } from "uuid";

import useUserStore from "@/stores/useUserStore";

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

export const getFigmaFile = async (fileKey) => {
  const accessToken = useUserStore.getState().accessToken;
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-FIGMA-TOKEN": accessToken,
    },
  });

  if (!res.ok) throw new Error("Figma 파일을 불러오는 데 실패했습니다");

  return res.json();
};

export const traverseFigmaNode = (node) => {
  if (!node || !node.children) return null;

  const isGroup = node.type === "GROUP" || node.type === "SECTION";

  if (isGroup) {
    const children = node.children.map(traverseFigmaNode).filter(Boolean);

    if (children.length > 0) {
      return {
        name: node.name,
        type: "group",
        children,
      };
    }

    return null;
  }

  if (node.type === "FRAME") {
    return {
      name: node.name,
      type: "frame",
    };
  }

  return null;
};

export const transformToTree = (data) => {
  const rootNodes = data.document?.children ?? [];

  return rootNodes
    .flatMap((page) => page.children?.map(traverseFigmaNode).filter(Boolean))
    .filter(Boolean);
};
