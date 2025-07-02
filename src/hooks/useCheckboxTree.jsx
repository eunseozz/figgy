import { useState } from "react";

import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";

export const useCheckboxTree = () => {
  const [checkedMap, setCheckedMap] = useState({});

  const collectNodeIds = (
    node,
    { onlyFrames = false, includeSelf = false } = {},
  ) => {
    const ids = [];

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

  const handleGroupToggle = (node, isChecked) => {
    const updated = { ...checkedMap };
    const allNodeIds = collectNodeIds(node, {
      onlyFrames: false,
      includeSelf: true,
    });

    allNodeIds.forEach((id) => {
      updated[id] = isChecked;
    });
    setCheckedMap(updated);
  };

  const handleFrameToggle = (frameId, isChecked, parentGroup) => {
    const updated = { ...checkedMap, [frameId]: isChecked };

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

  const getCheckedFrames = (tree) => {
    const result = [];

    const stack = [...tree];

    while (stack.length > 0) {
      const node = stack.pop();

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
