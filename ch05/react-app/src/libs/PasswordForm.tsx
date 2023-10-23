import { ChangeEvent, VFC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { fontSize, space } from "./constants";

const PASSWORD_LENGTH = 8;

type Props = {
  onSubmit: (password: string) => void;
};

export const PasswordForm: VFC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [isFocusOnButton, setIsFocusOnButton] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && isPasswordLengthEnough() && !isFocusOnButton)
        onSubmit(value);
    },
    [value, isFocusOnButton]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isPasswordLengthEnough = () => value.length >= PASSWORD_LENGTH;

  return (
    <Wrapper>
      <Label htmlFor="password">Password:</Label>
      <InputForm
        id="password"
        type="password"
        onChange={(e) => handleChange(e)}
        error={value.length < PASSWORD_LENGTH}
      />
      <Button
        onClick={() => onSubmit(value)}
        title="実行"
        type="primary"
        disabled={!isPasswordLengthEnough()}
        onFocus={() => setIsFocusOnButton(true)}
        onBlur={() => setIsFocusOnButton(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  margin: 0 ${space.m} 0 0;
  font-size: ${fontSize.m};
  line-height: 42px;
`;

const InputForm = styled(Input)`
  margin-right: ${space.m};
`;
