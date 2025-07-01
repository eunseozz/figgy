import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AddProjectModal from "@/components/AddProjectModal";
import DeleteProjectModal from "@/components/DeleteProejctModal";
import EmptyDropHint from "@/components/EmptyDropHint";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
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
        primaryButton={{
          label: "Figma 불러오기",
          onClick: () => setOpenModalKey("add"),
        }}
      >
        <PanelList
          title="PROJECTS"
          items={panelItems}
          onItemClick={(item) => {
            navigate(`/pages/${item.fileKey}`);
          }}
          emptyHint={
            <EmptyDropHint
              text="새 프로젝트를 추가해보세요"
              onClick={() => setOpenModalKey("add")}
            />
          }
        />
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
