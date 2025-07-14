import { useState } from "react";
import { useParams } from "react-router-dom";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";
import { SETTING_MODE } from "@/constants/folderSettingModes";
import useProjectStore from "@/stores/useProjectStore";
import { selectedProject } from "@/utils/project";

const getModalText = (currentType) => {
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
}) => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const { title, text } = getModalText(mode);

  const [inputName, setInputName] = useState(name);
  const [inputWidth, setInputWidth] = useState(width);
  const [errorTexts, setErrorTexts] = useState({
    folderName: "",
    width: "",
  });

  const setErrorText = (key, message) => {
    setErrorTexts((prev) => ({ ...prev, [key]: message }));
  };

  const inputFields = [
    {
      key: "folderName",
      label: "폴더명",
      value: inputName,
      setValue: setInputName,
      errorText: errorTexts.folderName,
    },
    {
      key: "width",
      label: "설정 너비",
      value: inputWidth,
      setValue: (value) => {
        if (/^\d*$/.test(value)) {
          setInputWidth(value);
        }
      },
      errorText: errorTexts.width,
    },
  ];

  const validateFolderInput = () => {
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
            onChange={(event) => {
              field.setValue(event.target.value);
              setErrorText(field.key, "");
            }}
            readOnly={field.readOnly}
            errorText={field.errorText}
            placeholder={field.placeholder}
          />
        ))}
      </ModalLayout>
    </ModalOverlay>
  );
};

export default FolderSettingsModal;
