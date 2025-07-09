import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import styled from "styled-components";

import GrayDashAddButton from "@/components/Common/GrayDashAddButton";

const PanelList = ({
  title,
  items,
  onItemClick,
  onDragStart,
  onDrop,
  onDragOver,
  emptyText,
  isToggle = false,
  onDeleteClick,
  onUpdateClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <TitleWrapper>
        <Title>{title}</Title>
        {isToggle && (
          <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <HiChevronUp /> : <HiChevronDown />}
          </ToggleButton>
        )}
      </TitleWrapper>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {items.length === 0 ? (
          <GrayDashAddButton text={emptyText} />
        ) : (
          <ProjectList
            onDrop={onDrop}
            onDragOver={onDragOver}
            $isOpen={isOpen}
          >
            {items.map((item, index) => (
              <ProjectItem key={index}>
                <PanelListButton
                  draggable
                  $isActive={item.isActive}
                  onClick={() => onItemClick(item)}
                  onDragStart={(e) => onDragStart(e, item)}
                >
                  {item.icon}
                  <LabelText>{item.label}</LabelText>
                </PanelListButton>
                <ButtonWrapper>
                  {!!onUpdateClick && (
                    <IconButton
                      type="button"
                      onClick={() => {
                        onUpdateClick(item);
                      }}
                    >
                      <FiEdit />
                    </IconButton>
                  )}

                  {!!onDeleteClick && (
                    <IconButton
                      type="button"
                      onClick={() => {
                        onDeleteClick(item);
                      }}
                    >
                      <FiTrash2 />
                    </IconButton>
                  )}
                </ButtonWrapper>
              </ProjectItem>
            ))}
          </ProjectList>
        )}
      </div>
    </div>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  svg {
    font-size: 16px;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 400;
`;

const ProjectList = styled.ul`
  margin-top: 12px;
  overflow-y: auto;
  transition: max-height 0.5s ease;
  max-height: ${({ $isOpen }) => ($isOpen ? "300px" : "0")};

  li + li {
    margin-top: 8px;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProjectItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  z-index: 1;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  svg {
    font-size: 16px;
    color: #aaa;
  }
`;

const PanelListButton = styled.button`
  display: flex;
  width: 100%;
  height: 40px;
  gap: 14px;
  align-items: center;
  background-color: ${({ $isActive }) =>
    $isActive ? "#f0f0f0" : "transparent"};
  font-size: 14px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-width: 0;

  svg {
    font-size: 18px;
    flex-shrink: 0;
  }
`;

const LabelText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  flex-grow: 1;
  min-width: 0;
`;

export default PanelList;
