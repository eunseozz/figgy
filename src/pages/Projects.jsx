import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useProjectStore from "@/stores/useProjectStore";
import { getFileKeyFromUrl } from "@/utils/util";

const Projects = () => {
  const navigate = useNavigate();

  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);

  const handleAddProject = () => {
    const figmaUrl =
      "https://www.figma.com/design/t4NRSKbOwOB3SbCbDBjESJ/%EB%82%B4%EC%A7%80%EA%B0%91%EC%86%8D_%ED%99%98%EB%B6%88%EC%A0%91%EC%88%98?node-id=0-1&p=f&t=G2CmbqMeBaTAALFS-0";
    const fileKey = getFileKeyFromUrl(figmaUrl);

    const alreadyExists = projects.some(
      (project) => project.fileKey === fileKey,
    );

    if (!alreadyExists) {
      addProject("Sample", fileKey);
    }
  };

  const panelItems = projects.map((project) => ({
    icon: <FaRegFolder />,
    label: project.projectName,
    fileKey: project.fileKey,
  }));

  return (
    <Panel
      primaryButton={{
        label: "Figma 불러오기",
        onClick: handleAddProject,
      }}
    >
      <PanelList
        title="PROJECTS"
        items={panelItems}
        onItemClick={(item) => {
          navigate(`/pages/${item.fileKey}`);
        }}
      />
    </Panel>
  );
};

export default Projects;
