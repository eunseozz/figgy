import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";
import type { FigmaNode } from "@/hooks/useCheckboxTree";

export const getFileKey = (url: string): string | null => {
  const match = url.match(/figma\.com\/(?:file|design)\/([^/?#]+)/);
  return match?.[1] || null;
};

export const transformToTree = (data: {
  document?: { children?: any[] };
}): FigmaNode[] => {
  const rootNodes = data.document?.children ?? [];

  const result = rootNodes
    .flatMap(
      (page) =>
        page.children
          ?.map((child: any) => traverseFigmaNode(child))
          .filter(Boolean) ?? [],
    )
    .filter(Boolean) as FigmaNode[];

  return result;
};

export const traverseFigmaNode = (node: any): FigmaNode | null => {
  if (!node || !node.children) return null;

  const isGroup =
    node.type === FIGMA_NODE_TYPE.GROUP ||
    node.type === FIGMA_NODE_TYPE.SECTION;

  if (isGroup) {
    const children = node.children
      .map((child: any) => traverseFigmaNode(child))
      .filter(Boolean) as FigmaNode[];

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
