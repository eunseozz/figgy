import { useState } from "react";
import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";

type FigmaNodeType = (typeof FIGMA_NODE_TYPE)[keyof typeof FIGMA_NODE_TYPE];

type FigmaNode = {
  id: string;
  name: string;
  type: FigmaNodeType;
  children?: FigmaNode[];
};

type CheckedMap = Record<string, boolean>;

export const useCheckboxTree = () => {
  const [checkedMap, setCheckedMap] = useState<CheckedMap>({});

  const collectNodeIds = (
    node: FigmaNode,
    options: { onlyFrames?: boolean; includeSelf?: boolean } = {},
  ): string[] => {
    const { onlyFrames = false, includeSelf = false } = options;
    const ids: string[] = [];

    const isFrame = node.type === FIGMA_NODE_TYPE.FRAME;
    const isGroup =
      node.type === FIGMA_NODE_TYPE.GROUP ||
      node.type === FIGMA_NODE_TYPE.SECTION;

    if (isFrame) {
      const isIncludeFrame = onlyFrames || includeSelf;
      if (isIncludeFrame) ids.push(node.id);
      return ids;
    }

    if (isGroup) {
      const isIncludeGroup = includeSelf && !onlyFrames;
      if (isIncludeGroup) ids.push(node.id);

      if (node.children) {
        node.children.forEach((child) => {
          ids.push(...collectNodeIds(child, { onlyFrames, includeSelf }));
        });
      }
    }

    return ids;
  };

  const handleGroupToggle = (node: FigmaNode, isChecked: boolean) => {
    const updated: CheckedMap = { ...checkedMap };
    const allNodeIds = collectNodeIds(node, {
      onlyFrames: false,
      includeSelf: true,
    });

    allNodeIds.forEach((id) => {
      updated[id] = isChecked;
    });

    setCheckedMap(updated);
  };

  const handleFrameToggle = (
    frameId: string,
    isChecked: boolean,
    parentGroup?: FigmaNode,
  ) => {
    const updated: CheckedMap = { ...checkedMap, [frameId]: isChecked };

    if (parentGroup) {
      const childFrameIds = collectNodeIds(parentGroup, {
        onlyFrames: true,
        includeSelf: false,
      });
      const allChecked = childFrameIds.every((id) => updated[id]);
      updated[parentGroup.id] = allChecked;
    }

    setCheckedMap(updated);
  };

  const getCheckedFrames = (
    tree: FigmaNode[],
  ): { id: string; name: string }[] => {
    const result: { id: string; name: string }[] = [];
    const stack = [...tree];

    while (stack.length > 0) {
      const node = stack.pop()!;
      if (checkedMap[node.id] && node.type === FIGMA_NODE_TYPE.FRAME) {
        result.push({ id: node.id, name: node.name });
      }
      if (node.children) {
        stack.push(...node.children);
      }
    }

    return result;
  };

  return {
    checkedMap,
    handleGroupToggle,
    handleFrameToggle,
    getCheckedFrames,
  };
};
