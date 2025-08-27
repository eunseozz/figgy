import { useState, ChangeEvent } from "react";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";
import useProjectStore from "@/stores/useProjectStore";
import { getFileKey } from "@/utils/figma";

type AddProjectModalProps = {
  closeModal: () => void;
};

type InputField = {
  key: string;
  label: string;
  placeholder?: string;
  value: string;
  setValue: (v: string) => void;
  readOnly?: boolean;
  errorText?: string;
};

const AddProjectModal = ({ closeModal }: AddProjectModalProps) => {
  const [projectName, setProjectName] = useState<string>("");
  const [figmaUrl, setFigmaUrl] = useState<string>("");

  const addProject = useProjectStore((state) => state.addProject);
  const projects = useProjectStore((state) => state.projects);

  const inputFields: InputField[] = [
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
    const isDuplicate = projects.some((project) => project.fileKey === fileKey);

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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              field.setValue(event.target.value)
            }
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
