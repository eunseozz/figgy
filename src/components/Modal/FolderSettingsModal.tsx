import { useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";
import { SETTING_MODE } from "@/constants/folderSettingModes";
import useProjectStore from "@/stores/useProjectStore";
import { selectedProject } from "@/utils/project";

type FolderSettingsModalProps = {
  closeModal: () => void;
  onConfirm: (newTitle: string, newWidth: number) => void;
  mode?: typeof SETTING_MODE.ADD | typeof SETTING_MODE.EDIT;
  name?: string;
  width?: string | number;
};

const getModalText = (
  currentType: typeof SETTING_MODE.ADD | typeof SETTING_MODE.EDIT,
) => {
  const isAddMode = currentType === SETTING_MODE.ADD;

  return {
    title: isAddMode
      ? "새 페이지 폴더를 추가해보세요"
      : "페이지 폴더를 수정해보세요",
    text: isAddMode
      ? "이름과 너비를 설정해서 새 폴더를 만들어볼 수 있어요."
      : "이름이나 설정값을 자유롭게 변경할 수 있어요.",
  };
};

const FolderSettingsModal = ({
  closeModal,
  onConfirm,
  mode = SETTING_MODE.ADD,
  name = "",
  width = "",
}: FolderSettingsModalProps) => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const project = useProjectStore(selectedProject(fileKey));

  const { title, text } = getModalText(mode);

  const [inputName, setInputName] = useState<string>(name);
  const [inputWidth, setInputWidth] = useState<string>(String(width));
  const [errorTexts, setErrorTexts] = useState<{
    folderName: string;
    width: string;
  }>({
    folderName: "",
    width: "",
  });

  const setErrorText = (key: keyof typeof errorTexts, message: string) => {
    setErrorTexts((prev) => ({ ...prev, [key]: message }));
  };

  const inputFields = [
    {
      key: "folderName" as const,
      label: "폴더명",
      value: inputName,
      setValue: setInputName,
      errorText: errorTexts.folderName,
    },
    {
      key: "width" as const,
      label: "설정 너비",
      value: inputWidth,
      setValue: (value: string) => {
        if (/^\d*$/.test(value)) {
          setInputWidth(value);
        }
      },
      errorText: errorTexts.width,
    },
  ];

  const validateFolderInput = (): boolean => {
    const numericWidth = Number(inputWidth);
    let isValid = true;

    if (numericWidth > 1920) {
      setErrorText("width", "1920px 까지만 입력할 수 있어요.");
      isValid = false;
    }

    const isSameTitle = name === inputName;
    const isSameWidth = width === numericWidth;

    const hasDuplicateTitle = project?.pages.some(
      (page) => page.title === inputName,
    );
    const hasDuplicateWidth = project?.pages.some(
      (page) => page.minWidth === numericWidth,
    );

    if (hasDuplicateTitle && !isSameTitle) {
      setErrorText("folderName", "이미 같은 이름의 폴더가 있어요.");
      isValid = false;
    }

    if (hasDuplicateWidth && !isSameWidth) {
      setErrorText("width", "이미 같은 너비의 폴더가 있어요.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title={title}
        text={text}
        onConfirm={() => {
          const isValid = validateFolderInput();

          if (!isValid) return;

          onConfirm(inputName, Number(inputWidth));
        }}
        isConfirmDisabled={
          inputName === "" ||
          inputWidth === "" ||
          Object.values(errorTexts).some((text) => text !== "")
        }
      >
        {inputFields.map((field) => (
          <InputGroup
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              field.setValue(event.target.value);
              setErrorText(field.key, "");
            }}
            errorText={field.errorText}
          />
        ))}
      </ModalLayout>
    </ModalOverlay>
  );
};

export default FolderSettingsModal;
