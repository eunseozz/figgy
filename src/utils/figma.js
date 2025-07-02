import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";

export const getFileKey = (url) => {
  const match = url.match(/figma\.com\/(?:file|design)\/([^/?#]+)/);

  return match?.[1] || null;
};

export const transformToTree = (data) => {
  const rootNodes = data.document?.children ?? [];

  const result = rootNodes
    .flatMap((page) => page.children?.map(traverseFigmaNode).filter(Boolean))
    .filter(Boolean);

  return result;
};

export const traverseFigmaNode = (node) => {
  if (!node || !node.children) return null;

  const isGroup =
    node.type === FIGMA_NODE_TYPE.GROUP ||
    node.type === FIGMA_NODE_TYPE.SECTION;

  if (isGroup) {
    const children = node.children.map(traverseFigmaNode).filter(Boolean);

    if (children.length > 0) {
      return {
        id: node.id,
        name: node.name,
        type: FIGMA_NODE_TYPE.GROUP,
        children,
      };
    }

    return null;
  }

  if (node.type === FIGMA_NODE_TYPE.FRAME) {
    return {
      id: node.id,
      name: node.name,
      type: FIGMA_NODE_TYPE.FRAME,
    };
  }

  return null;
};
