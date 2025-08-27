import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { TbFolderPlus } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import GrayDashAddButton from "@/components/Common/GrayDashAddButton";
import FolderSettingsModal from "@/components/Modal/FolderSettingsModal";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore from "@/stores/useProjectStore";
import { getAssetUrl } from "@/utils/chrome";
import { selectedProject } from "@/utils/project";

const logoImage: string = getAssetUrl("images/logos/full.png");

type AddButton = {
  text: string;
  onClick: () => void;
};

type PanelProps = {
  children: React.ReactNode;
  isShowToolBar?: boolean;
  addButton?: AddButton;
};

type Project = { projectId: string };
type CreatePageFolderFn = (
  projectId: string,
  title: string,
  minWidth: number,
) => void;
type ResetActivePageFn = (fileKey?: string) => void;
type ClearFeedbackFn = () => void;

const Panel: React.FC<PanelProps> = ({
  children,
  isShowToolBar = false,
  addButton,
}) => {
  const { fileKey } = useParams<{ fileKey?: string }>();
  const project = useProjectStore<Project | undefined>(
    selectedProject(fileKey),
  );

  const navigate = useNavigate();
  const isOpenPanel = useHUDStore((state) => state.isOpenPanel as boolean);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const createPageFolder = useProjectStore(
    (state) => state.createPageFolder as CreatePageFolderFn,
  );
  const resetActivePage = useProjectStore(
    (state) => state.resetActivePage as ResetActivePageFn,
  );
  const clearFeedback = useFeedbackStore(
    (state) => state.clearFeedback as ClearFeedbackFn,
  );

  return (
    <>
      <Container $isOpenPanel={!!isOpenPanel}>
        <Header>
          <Logo>Figgy</Logo>
        </Header>

        <Section $isShowToolBar={!!isShowToolBar}>
          {isShowToolBar && (
            <ToolBar>
              <IconButton
                type="button"
                onClick={() => {
                  clearFeedback();
                  resetActivePage(fileKey);
                  navigate("/");
                }}
                aria-label="뒤로가기"
                title="뒤로가기"
              >
                <IoMdArrowBack />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => setIsOpenModal(true)}
                aria-label="폴더 추가"
                title="폴더 추가"
              >
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
          onConfirm={(newTitle: string, newWidth: number) => {
            if (!project) {
              setIsOpenModal(false);
              return;
            }
            createPageFolder(project.projectId, newTitle, newWidth);
            setIsOpenModal(false);
          }}
        />
      )}
    </>
  );
};

const Container = styled.div<{ $isOpenPanel: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpenPanel }) => ($isOpenPanel ? "0" : "-400px")};
  width: 400px;
  height: 100vh;
  background-color: #fff;
  z-index: 10003;
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

const Section = styled.section<{ $isShowToolBar: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $isShowToolBar }) =>
    $isShowToolBar ? "0 24px 24px" : "24px 24px 24px"};
`;

const ToolBar = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;

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
