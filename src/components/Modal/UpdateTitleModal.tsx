import { useState, ChangeEvent } from "react";

import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";

type UpdateTitleModalProps = {
  closeModal: () => void;
  onConfirm: (newTitle: string) => void;
  title: string;
  label: string;
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

const UpdateTitleModal = ({
  closeModal,
  onConfirm,
  title,
  label,
}: UpdateTitleModalProps) => {
  const [value, setValue] = useState<string>(title);

  const inputFields: InputField[] = [
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

export default UpdateTitleModal;
