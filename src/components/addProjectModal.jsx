import { useState } from "react";

import InputGroup from "@/components/InputGroup";
import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";
import useProjectStore from "@/stores/useProjectStore";
import { getFileKey } from "@/utils/figma";

const AddProjectModal = ({ closeModal }) => {
  const [projectName, setProjectName] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");

  const addProject = useProjectStore((state) => state.addProject);
  const projects = useProjectStore((state) => state.projects);

  const inputFields = [
    {
      key: "projectName",
      label: "프로젝트 이름",
      placeholder: "Toss",
      value: projectName,
      setValue: setProjectName,
    },
    {
      key: "figmaUrl",
      label: "URL",
      placeholder: "https://www.figma.com/",
      value: figmaUrl,
      setValue: setFigmaUrl,
    },
  ];

  const handleAddProject = () => {
    const fileKey = getFileKey(figmaUrl);
    const isDuplicate = !!projects.some(
      (project) => project.fileKey === fileKey,
    );

    if (isDuplicate) return;

    addProject(projectName, fileKey);
    closeModal();
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="Figma 링크로 바로 시작해보세요"
        text="URL을 입력하면 프레임 정보를 자동으로 가져올게요."
        onConfirm={handleAddProject}
        onCancel={closeModal}
      >
        {inputFields.map((field) => (
          <InputGroup
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(event) => field.setValue(event.target.value)}
            readOnly={field.readOnly}
            errorText={field.errorText}
            placeholder={field.placeholder}
          />
        ))}
      </ModalLayout>
    </ModalOverlay>
  );
};

export default AddProjectModal;
