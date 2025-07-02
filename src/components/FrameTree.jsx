import { FiFileText, FiFolder } from "react-icons/fi";
import styled from "styled-components";

import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";

const FrameTree = ({
  nodes,
  depth = 0,
  parent = null,
  checkedMap,
  onGroupToggle,
  onFrameToggle,
}) => {
  return (
    <TreeWrapper>
      {nodes.map((node, index) => {
        if (node.type === FIGMA_NODE_TYPE.GROUP) {
          return (
            <TreeGroup key={index}>
              <GroupHeader $depth={depth}>
                <Checkbox
                  checked={!!checkedMap[node.id]}
                  onChange={(e) => onGroupToggle(node, e.target.checked)}
                />
                <FolderIcon />
                <GroupLabel>{node.name}</GroupLabel>
              </GroupHeader>
              <TreeChildrenWrapper>
                <FrameTree
                  nodes={node.children}
                  depth={depth + 1}
                  parent={node}
                  checkedMap={checkedMap}
                  onGroupToggle={onGroupToggle}
                  onFrameToggle={onFrameToggle}
                />
              </TreeChildrenWrapper>
            </TreeGroup>
          );
        }

        return (
          <TreeFrame
            key={index}
            $depth={depth}
          >
            <Checkbox
              checked={!!checkedMap[node.id]}
              onChange={(e) => onFrameToggle(node.id, e.target.checked, parent)}
            />
            <PageIcon />
            <FrameLabel>{node.name}</FrameLabel>
          </TreeFrame>
        );
      })}
    </TreeWrapper>
  );
};

const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TreeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  padding-left: ${({ $depth }) => ($depth === 0 ? 0 : $depth * 24)}px;
`;

const TreeChildrenWrapper = styled.div`
  max-height: 85px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const TreeFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: ${({ $depth }) => ($depth === 0 ? 0 : $depth * 24)}px;
`;

const FolderIcon = styled(FiFolder)`
  font-size: 16px;
  color: #6dbbbf;
  fill: #6dbbbf;
`;

const PageIcon = styled(FiFileText)`
  font-size: 16px;
  color: #777;
`;

const GroupLabel = styled.span`
  font-size: 14px;
`;

const FrameLabel = styled.div`
  font-size: 14px;
  color: #777;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  accent-color: #16a1b7;
`;

export default FrameTree;
