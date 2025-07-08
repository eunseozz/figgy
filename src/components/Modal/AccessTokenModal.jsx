import { useState } from "react";

import { checkAccessToken } from "@/api/figma";
import ModalOverlay from "@/components/Common/ModalOverlay";
import InputGroup from "@/components/Modal/InputGroup";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";
import useUserStore from "@/stores/useUserStore";

const AccessTokenModal = ({ closeModal }) => {
  const [value, setValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const setAccessToken = useUserStore((state) => state.setAccessToken);

  const handleConfirm = async () => {
    const isValid = await checkAccessToken(value);

    if (!isValid) {
      setErrorText("토큰이 유효하지 않아요");

      return;
    }

    setAccessToken(value);
    closeModal();
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="액세스 토큰을 입력해주세요"
        text="Figma 데이터를 불러오기 위해 필요한 정보예요"
        onConfirm={handleConfirm}
        onCancel={closeModal}
        isConfirmDisabled={!value || errorText}
      >
        <InputGroup
          label="액세스 토큰"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setErrorText("");
          }}
          errorText={errorText}
        />
      </ModalLayout>
    </ModalOverlay>
  );
};

export default AccessTokenModal;
