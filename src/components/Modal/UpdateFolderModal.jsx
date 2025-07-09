import { useState } from "react";
import { useParams } from "react-router-dom";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const UpdateFolderModal = ({
  closeModal,
  onConfirm,
  name = "",
  width = "",
}) => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const [inputName, setInputName] = useState(name);
  const [inputWidth, setInputWidth] = useState(width);
  const [errorText, setErrorText] = useState("");

  const inputFields = [
    {
      key: "folderName",
      label: "폴더명",
      value: inputName,
      setValue: setInputName,
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
      errorText,
    },
  ];

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="페이지 폴더를 수정해보세요"
        text="이름이나 설정값을 자유롭게 변경할 수 있어요."
        onConfirm={() => {
          if (inputWidth > 1920) {
            setErrorText("1920px 까지만 입력할 수 있어요.");

            return;
          }

          const numericWidth = Number(inputWidth);
          const isDuplicateWidth = project?.pages.some(
            (page) => page.minWidth === numericWidth,
          );

          if (isDuplicateWidth) {
            setErrorText("이미 같은 너비의 폴더가 있어요.");

            return;
          }

          onConfirm(inputName, numericWidth);
        }}
        isConfirmDisabled={inputName === "" || inputWidth === ""}
      >
        {inputFields.map((field) => (
          <InputGroup
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(event) => {
              field.setValue(event.target.value);

              if (field.errorText !== undefined) {
                setErrorText("");
              }
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

export default UpdateFolderModal;
