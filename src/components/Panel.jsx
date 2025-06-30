import { AiOutlineSetting } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getAssetUrl } from "@/utils/util";

const logoImage = getAssetUrl("images/logos/full.png");

const Panel = ({ children, isShowToolBar = false, primaryButton }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Logo>Figgy</Logo>
      </Header>

      <Section $isShowToolBar={isShowToolBar}>
        {isShowToolBar && (
          <ToolBar>
            <IconButton onClick={() => navigate("/")}>
              <IoMdArrowBack />
            </IconButton>
            <IconButton>
              <AiOutlineSetting />
            </IconButton>
          </ToolBar>
        )}

        {primaryButton && (
          <ButtonWrapper>
            <GrayFullButton onClick={primaryButton.onClick}>
              {primaryButton.label}
            </GrayFullButton>
          </ButtonWrapper>
        )}

        <Content>{children}</Content>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: #fff;
  z-index: 999999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 70px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
`;

const Logo = styled.h1`
  width: 80px;
  height: 30px;
  background: url(${logoImage}) no-repeat;
  background-size: 100%;
  text-indent: -9999px;
`;

const Section = styled.section`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $isShowToolBar }) =>
    $isShowToolBar ? "0 24px 24px" : "24px 24px 24px"};
`;

const ToolBar = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;

  svg {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GrayFullButton = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  background-color: #c3c3c3;
  color: #fff;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
`;

export default Panel;
