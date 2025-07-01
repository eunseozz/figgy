import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import EmptyDropHint from "@/components/EmptyDropHint";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useProjectStore from "@/stores/useProjectStore";
import { getFileKeyFromUrl } from "@/utils/util";

const FIGMA_URL =
  "https://www.figma.com/design/mChQkVnLzLM1FbphFgDzbA/%EA%B5%90%ED%99%98%EC%86%8C-%EC%82%AC%EC%9D%B4%ED%8A%B8?node-id=0-1&p=f&t=KDZmfu5T0O9IXMZm-0";

const Projects = () => {
  const navigate = useNavigate();

  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);

  const handleAddProject = () => {
    const figmaUrl = FIGMA_URL;
    const fileKey = getFileKeyFromUrl(figmaUrl);

    const isDuplicate = !!projects.some(
      (project) => project.fileKey === fileKey,
    );

    if (isDuplicate) return;

    addProject("Sample", fileKey);
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
        emptyHint={
          <EmptyDropHint
            text="새 프로젝트를 추가해보세요"
            onClick={handleAddProject}
          />
        }
      />
    </Panel>
  );
};

export default Projects;
