import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import styled from "styled-components";

const PanelList = ({
  title,
  items,
  onItemClick,
  onDragStart,
  onDrop,
  onDragOver,
  isToggle = false,
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

      <ProjectListWrapper $isOpen={isOpen}>
        <ProjectList
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {items.map((item, index) => (
            <li key={index}>
              <PanelListButton
                type="button"
                draggable
                $isActive={item.isActive}
                onClick={() => onItemClick(item)}
                onDragStart={(e) => onDragStart(e, item)}
              >
                {item.icon}
                {item.label}
              </PanelListButton>
            </li>
          ))}
        </ProjectList>
      </ProjectListWrapper>
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

const ProjectListWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease;
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
`;

const ProjectList = styled.ul`
  margin-top: 16px;

  li + li {
    margin-top: 8px;
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
  padding: 0 12px;
  transition: background-color 0.2s ease;

  svg {
    font-size: 18px;
  }
`;

export default PanelList;
