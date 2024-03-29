import { VFC } from "react";
import styled, { css } from "styled-components";
import { color, space } from "./constants";

type ButtonType = "primary" | "secondary" | "error";

type Props = {
  title: string;
  onClick: () => void;
  type?: ButtonType;
  width?: number;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Button: VFC<Props> = ({
  title,
  onClick,
  width = 80,
  type = "primary",
  disabled = false,
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <Wrapper
      onClick={onClick}
      width={width}
      className={type}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.button<{ width: number }>`
  padding: ${space.m};
  border: solid 1px ${color.green};
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  ${(props) =>
    css`
      width: ${props.width};
    `}
  &.secondary {
    border: solid 1px ${color.gray};
    background: ${color.white};
    color: ${color.black};
  }
  &.error {
    border: none;
    background: ${color.red};
    color: ${color.white};
  }
`;
