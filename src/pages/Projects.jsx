import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Panel from "@/components/Common/Panel/Panel";
import PanelList from "@/components/Common/Panel/PanelList";
import AddProjectModal from "@/components/Modal/AddProejctModal/AddProjectModal";
import DeleteProjectModal from "@/components/Modal/DeleteProejctModal";
import useProjectStore from "@/stores/useProjectStore";

const Projects = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);

  const [openModalKey, setOpenModalKey] = useState(null);

  const handleCloseModal = () => setOpenModalKey(null);

  const panelItems = projects.map((project) => ({
    icon: <FaRegFolder />,
    label: project.projectName,
    fileKey: project.fileKey,
  }));

  const modals = [
    {
      key: "add",
      Component: AddProjectModal,
      isOpen: openModalKey === "add",
      props: { closeModal: handleCloseModal },
    },
    {
      key: "delete",
      Component: DeleteProjectModal,
      isOpen: openModalKey === "delete",
      props: {
        onCancel: handleCloseModal,
        onConfirm: () => {
          handleCloseModal();
        },
      },
    },
  ];

  return (
    <>
      <Panel
        addButton={{
          text: "새 프로젝트를 추가해보세요",
          onClick: () => setOpenModalKey("add"),
        }}
      >
        {panelItems.length > 0 && (
          <PanelList
            title="PROJECTS"
            items={panelItems}
            onItemClick={(item) => {
              navigate(`/pages/${item.fileKey}`);
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
