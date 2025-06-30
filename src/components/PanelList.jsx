import styled from "styled-components";

const PanelList = ({ title, items, onItemClick }) => {
  return (
    <div>
      <Title>{title}</Title>
      <ProjectList>
        {items?.map((item, index) => (
          <li key={index}>
            <PanelListButton onClick={() => onItemClick(item)}>
              {item.icon}
              {item.label}
            </PanelListButton>
            {item.subItems && (
              <DeviceList>
                {item.subItems.map((subItem, idx) => (
                  <li key={idx}>
                    <DeviceButton isActive={subItem.isActive}>
                      <span>{subItem.label}</span>
                      <DeviceLabel>{subItem.device}</DeviceLabel>
                    </DeviceButton>
                  </li>
                ))}
              </DeviceList>
            )}
          </li>
        ))}
      </ProjectList>
    </div>
  );
};

const Title = styled.h2`
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 400;
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
  background-color: transparent;
  font-size: 14px;

  svg {
    font-size: 18px;
  }
`;

const DeviceList = styled.ul`
  position: relatvie;
  padding: 0 14px;
  border-left: 2px solid #d9d9d9;
  margin-top: 10px;
`;

const DeviceButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border-radius: 6px;
  background-color: ${({ isActive }) => (isActive ? "#f6f6f6" : "#ffffff")};
`;

const DeviceLabel = styled.li`
  height: 24px;
  line-height: 24px;
  background-color: #b6b6b6;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
  padding: 0 8px;
  letter-spacing: 1px;
`;

export default PanelList;
