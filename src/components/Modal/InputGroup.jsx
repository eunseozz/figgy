import styled from "styled-components";

const InputGroup = ({
  label,
  value,
  onChange,
  readOnly = false,
  errorText = undefined,
  placeholder,
}) => {
  return (
    <GroupWrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {errorText !== undefined && <ErrorText>{errorText}</ErrorText>}
    </GroupWrapper>
  );
};

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: #111;
`;

const Input = styled.input`
  background-color: #f4f4f5;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  border: none;

  &::placeholder {
    color: #aaa;
  }
`;

const ErrorText = styled.p`
  font-size: 11px;
  height: 16px;
  line-height: 16px;
  color: #ff0000;
`;

export default InputGroup;
