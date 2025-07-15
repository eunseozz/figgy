import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Panel from "@/components/Common/Panel/Panel";
import PanelList from "@/components/Common/Panel/PanelList";
import AccessTokenModal from "@/components/Modal/AccessTokenModal";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import UpdateTitleModal from "@/components/Modal/UpdateTitleModal";
import useProjectStore from "@/stores/useProjectStore";
import useUserStore from "@/stores/useUserStore";

const Projects = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const resetActivePage = useProjectStore((state) => state.resetActivePage);
  const updateProjectTitle = useProjectStore(
    (state) => state.updateProjectTitle,
  );

  const [openModalKey, setOpenModalKey] = useState(null);
  const [targetProject, setTargetProject] = useState(null);

  const accessToken = useUserStore((state) => state.accessToken);

  const handleCloseModal = () => setOpenModalKey(null);

  const panelItems = projects.map((project) => ({
    icon: <FaRegFolder />,
    label: project.projectName,
    fileKey: project.fileKey,
  }));

  const modals = [
    {
      key: "accessToken",
      Component: AccessTokenModal,
      isOpen: openModalKey === "accessToken",
      props: { closeModal: handleCloseModal },
    },
    {
      key: "add",
      Component: AddProjectModal,
      isOpen: openModalKey === "add",
      props: { closeModal: handleCloseModal },
    },
    {
      key: "delete",
      Component: ConfirmDeleteModal,
      isOpen: openModalKey === "delete",
      props: {
        title: "프로젝트 삭제를 진행할게요",
        text: "삭제하면 이 프로젝트의 모든 정보가 사라지고 복구할 수 없어요.",
        onCancel: handleCloseModal,
        onConfirm: () => {
          deleteProject(targetProject.fileKey);
          handleCloseModal();
        },
      },
    },
    {
      key: "update",
      Component: UpdateTitleModal,
      isOpen: openModalKey === "update",
      props: {
        closeModal: handleCloseModal,
        onConfirm: (newTitle) => {
          updateProjectTitle(targetProject.fileKey, newTitle);
          handleCloseModal();
        },
        title: targetProject?.label,
        label: "프로젝트 이름",
      },
    },
  ];

  return (
    <>
      <Panel
        addButton={{
          text: "새 프로젝트를 추가해보세요",
          onClick: () => {
            setOpenModalKey(accessToken ? "add" : "accessToken");
          },
        }}
      >
        {panelItems.length > 0 && (
          <PanelList
            title="PROJECTS"
            items={panelItems}
            onItemClick={(item) => {
              resetActivePage(item.fileKey);
              navigate(`/pages/${item.fileKey}`);
            }}
            onDeleteClick={(item) => {
              setTargetProject(item);
              setOpenModalKey("delete");
            }}
            onUpdateClick={(item) => {
              setTargetProject(item);
              setOpenModalKey("update");
            }}
          />
        )}
      </Panel>

      {modals.map((modal) =>
        modal.isOpen ? (
          <modal.Component
            key={modal.key}
            {...modal.props}
          />
        ) : null,
      )}
    </>
  );
};

export default Projects;
