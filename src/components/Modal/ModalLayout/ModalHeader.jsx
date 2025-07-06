import styled from "styled-components";

const ModalHeader = ({ icon, title, text }) => {
  return (
    <HeaderContainer>
      <Title>
        {icon && <Icon>{icon}</Icon>}
        {title}
      </Title>
      <Text>{text}</Text>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const Icon = styled.span`
  svg {
    font-size: 18px;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #111;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #71717a;
  letter-spacing: -0.01em;
`;

export default ModalHeader;
