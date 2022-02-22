import styled from "@emotion/styled";
import { kMaxLength } from "buffer";
import React from "react";

// Style
interface IPropsStyle {
  container: {
    size: string;
  };
  wrapper: {
    width: string;
    size: string;
    isDisabled: boolean;
  };
  background: {
    size: string;
    isRounded: boolean;
  };
  input: {
    inputSize: string;
  };
  icon: {
    size: string;
  };
}

const Style = {
  Container: styled.label<IPropsStyle["container"]>`
    display: flex;
    flex-direction: column;
    gap: ${props => {
      switch (props.size) {
        case "large":
          return "12px";
        case "small":
          return "4px";
        default:
          return "8px";
      }
    }};
  `,
  Label: styled.div<IPropsStyle["container"]>`
    font-size: ${props => {
      switch (props.size) {
        case "large":
          return props.theme.fontSize.body2;
        case "small":
          return props.theme.fontSize.body3;
        default:
          return props.theme.fontSize.body2;
      }
    }};
    line-height: ${props => {
      switch (props.size) {
        case "large":
          return props.theme.lineHeight.body2;
        case "small":
          return props.theme.lineHeight.body3;
        default:
          return props.theme.lineHeight.body2;
      }
    }};
  `,
  Wrapper: styled.div<IPropsStyle["wrapper"]>`
    display: flex;
    align-items: center;
    width: ${props => (props.width ? props.width : "auto")};
    height: ${props => {
      switch (props.size) {
        case "large":
          return "3rem";
        case "small":
          return "2rem";
        default:
          return "2.5rem";
      }
    }};
    position: relative;
    cursor: ${props => (props.isDisabled ? "not-allowed" : "text")};
    padding-left: ${props => {
      switch (props.size) {
        case "large":
          return "13px";
        case "small":
          return "7px";
        default:
          return "9px";
      }
    }};
    padding-right: ${props => {
      switch (props.size) {
        case "large":
          return "14px";
        case "small":
          return "8px";
        default:
          return "10px";
      }
    }};
    gap: ${props => {
      switch (props.size) {
        case "large":
          return "8px";
        case "small":
          return "4px";
        default:
          return "6px";
      }
    }};
  `,
  Background: styled.div<IPropsStyle["background"]>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.color.white};
    border-radius: ${props =>
      props.isRounded
        ? props.theme.rounded.full
        : props.size === "large"
        ? props.theme.rounded.md
        : props.size === "small"
        ? props.theme.rounded.xs
        : props.theme.rounded.sm};
    border-width: 1px;
    border-color: ${props => props.theme.color.gray[300]};
    z-index: 1;
  `,
  Prefix: styled.div<IPropsStyle["icon"]>`
    flex: none;
    order: -1;
    z-index: 2;
    & > svg {
      width: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          case "small":
            return "16px";
          default:
            return "18px";
        }
      }};
      height: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          case "small":
            return "16px";
          default:
            return "18px";
        }
      }};
      & > path {
        fill: ${props => props.theme.color.gray[400]};
      }
    }
  `,
  Suffix: styled.div<IPropsStyle["icon"]>`
    flex: none;
    order: 1;
    z-index: 2;
    & > svg {
      width: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          case "small":
            return "16px";
          default:
            return "18px";
        }
      }};
      height: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          case "small":
            return "16px";
          default:
            return "18px";
        }
      }};
      & > path {
        fill: ${props => props.theme.color.gray[400]};
      }
    }
  `,
  Caption: styled.div`
    font-size: ${props => props.theme.fontSize.body3};
    line-height: ${props => props.theme.lineHeight.body3};
  `,
  Error: styled.div`
    font-size: ${props => props.theme.fontSize.body3};
    line-height: ${props => props.theme.lineHeight.body3};
    color: ${props => props.theme.color.red[600]};
  `,
};

const Input = styled.input<IPropsStyle["input"]>`
  flex: 1 1 0%;
  order: 0;
  appearance: none;
  z-index: 2;
  background-color: transparent;
  font-size: ${props => {
    switch (props.inputSize) {
      case "large":
        return props.theme.fontSize.body1;
      case "small":
        return props.theme.fontSize.body3;
      default:
        return props.theme.fontSize.body2;
    }
  }};
  line-height: ${props => {
    switch (props.inputSize) {
      case "large":
        return props.theme.lineHeight.body1;
      case "small":
        return props.theme.lineHeight.body3;
      default:
        return props.theme.lineHeight.body2;
    }
  }};
  &:hover {
    outline: 0;
    & ~ ${Style.Background} {
      border-color: ${props => props.theme.color.gray[400]};
    }
  }
  &:focus,
  &:active {
    outline: 0;
    & ~ ${Style.Background} {
      border-width: 2px;
      border-color: ${props => props.theme.color.blue[600]};
    }
    & ~ ${Style.Prefix}, & ~ ${Style.Suffix} {
      & > svg > path {
        fill: ${props => props.theme.color.blue[600]};
      }
    }
  }
  &::placeholder {
    color: ${props => props.theme.color.gray[400]};
  }
  &:disabled {
    cursor: not-allowed;
    & ~ ${Style.Background} {
      opacity: 0.25;
      border-width: 1px;
      border-color: ${props => props.theme.color.gray[300]};
    }
    & ~ ${Style.Prefix}, & ~ ${Style.Suffix} {
      opacity: 0.25;
    }
  }
`;

// Component

interface IPropsTextField {
  state?: string;
  size?: string;
  name?: string;
  value?: string;
  width?: string;
  maxLength?: number;
  isDisabled?: boolean;
  isRounded?: boolean;
  label?: string;
  placeholder?: string;
  caption?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  width = "auto",
  size = "medium",
  name,
  value,
  caption,
  error,
  maxLength,
  isDisabled = false,
  isRounded = false,
  prefix,
  suffix,
  placeholder,
  type = "text",
  onChange,
  onFocus,
}: IPropsTextField) => (
  <Style.Container size={size}>
    {label && <Style.Label size={size}>{label}</Style.Label>}
    <Style.Wrapper width={width} size={size} isDisabled={isDisabled}>
      <Input
        type={type}
        name={name}
        value={value}
        inputSize={size}
        disabled={isDisabled}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={onFocus}
      />
      {prefix && <Style.Prefix size={size}>{prefix}</Style.Prefix>}
      {suffix && <Style.Suffix size={size}>{suffix}</Style.Suffix>}
      <Style.Background size={size} isRounded={isRounded} />
    </Style.Wrapper>
    {caption && <Style.Caption>{caption}</Style.Caption>}
    {error && <Style.Error>{error}</Style.Error>}
  </Style.Container>
);

export default TextField;
