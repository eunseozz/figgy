import { useState } from "react";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";

const UpdateTitleModal = ({ closeModal, onConfirm, title, label }) => {
  const [value, setValue] = useState(title);

  const inputFields = [
    {
      key: "projectName",
      label,
      placeholder: "Toss",
      value,
      setValue,
    },
  ];

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title={`${label}을 수정해보세요`}
        text="더 알아보기 쉬운 이름으로 바꿔둘 수 있어요."
        onConfirm={() => {
          onConfirm(value);
        }}
        isConfirmDisabled={!value}
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

export default UpdateTitleModal;
