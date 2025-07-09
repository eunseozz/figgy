import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { TbFolderPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GrayDashAddButton from "@/components/Common/GrayDashAddButton";
import FolderSettingsModal from "@/components/Modal/FolderSettingsModal";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";
import { getAssetUrl } from "@/utils/chrome";

const logoImage = getAssetUrl("images/logos/full.png");

const Panel = ({ children, isShowToolBar = false, addButton }) => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const navigate = useNavigate();
  const isOpenPanel = useHUDStore((state) => state.isOpenPanel);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const createPageFolder = useProjectStore((state) => state.createPageFolder);
  const resetActivePage = useProjectStore((state) => state.resetActivePage);
  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);

  return (
    <>
      <Container $isOpenPanel={isOpenPanel}>
        <Header>
          <Logo>Figgy</Logo>
        </Header>

        <Section $isShowToolBar={isShowToolBar}>
          {isShowToolBar && (
            <ToolBar>
              <IconButton
                onClick={() => {
                  clearFeedback();
                  resetActivePage(fileKey);
                  navigate("/");
                }}
              >
                <IoMdArrowBack />
              </IconButton>
              <IconButton onClick={() => setIsOpenModal(true)}>
                <TbFolderPlus />
              </IconButton>
            </ToolBar>
          )}

          {addButton && (
            <GrayDashAddButton
              text={addButton.text}
              onClick={addButton.onClick}
            />
          )}

          <Content>{children}</Content>
        </Section>
      </Container>
      {isOpenModal && (
        <FolderSettingsModal
          closeModal={() => setIsOpenModal(false)}
          onConfirm={(newTitle, newWidth) => {
            createPageFolder(project.projectId, newTitle, newWidth);
            setIsOpenModal(false);
          }}
        />
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: ${({ $isOpenPanel }) => ($isOpenPanel ? "0" : "-400px")};
  width: 400px;
  height: 100vh;
  background-color: #fff;
  z-index: 13000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
`;

export default Panel;
