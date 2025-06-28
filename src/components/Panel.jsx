import styled from "styled-components";

const logoImage = chrome.runtime.getURL("images/logos/full.png");

const Panel = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo>Figgy</Logo>
      </Header>
      <Section>{children}</Section>
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
`;

const Header = styled.header`
  height: 80px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Logo = styled.h1`
  width: 90px;
  height: 34px;
  background: url(${logoImage}) no-repeat;
  background-size: 100%;
  text-indent: -9999px;
`;

const Section = styled.section`
  padding: 0 24px;
`;

export default Panel;
