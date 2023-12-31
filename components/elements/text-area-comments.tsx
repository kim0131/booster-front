import styled from "@emotion/styled";
import Badge from "./badge";

interface IPropsStyle {
  container: {
    isDisabled?: boolean;
  };
}

const Style = {
  Container: styled.label<IPropsStyle["container"]>`
    display: flex;
    flex-direction: column;
    padding: 14px;
    gap: 0.75rem;
    position: relative;
    cursor: ${props => (props.isDisabled ? "not-allowed" : "text")};
  `,
  Background: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.color.white};
    border-radius: ${props => props.theme.rounded.md};
    border-width: 1px;
    border-color: ${props => props.theme.color.gray[300]};
    z-index: 1;
  `,
  Tool: styled.div`
    display: flex;
    justify-content: flex-end;
    z-index: 2;
  `,
};

const Input = styled.textarea`
  appearance: none;
  z-index: 2;
  background-color: transparent;
  font-size: ${props => props.theme.fontSize.body1};
  line-height: ${props => props.theme.lineHeight.body1};
  resize: none;
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
  }
`;

interface IPropsTextAreaComments {
  name: string;
  value: string;
  thumbnail: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  isDisabled?: boolean;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}

const TextAreaComments = ({
  name,
  value,
  onChange,
  onFocus,
  textAreaRef,
  isDisabled,
  rows,
  placeholder,
  maxLength,
}: IPropsTextAreaComments) => {
  return (
    <Style.Container isDisabled={isDisabled}>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        ref={textAreaRef}
        disabled={isDisabled}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <Style.Tool>
        <Badge>
          {value.length.toLocaleString()} / {maxLength?.toLocaleString()}
        </Badge>
      </Style.Tool>
      <Style.Background />
    </Style.Container>
  );
};

export default TextAreaComments;
