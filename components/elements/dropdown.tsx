import styled from "@emotion/styled";

interface IPropsStyle {
  container: {
    width: string;
    size: string;
    isRight: boolean;
  };
  item: {
    size: string;
  };
}

const Style = {
  Container: styled.div<IPropsStyle["container"]>`
    position: absolute;
    top: calc(100% - 0.5rem);
    left: ${props => (props.isRight ? "auto" : "0")};
    right: ${props => (props.isRight ? "0" : "auto")};
    display: flex;
    flex-direction: column;
    width: ${props => props.width};
    padding: ${props => (props.size === "large" ? "0.75rem 0" : "0.5rem 0")};
    border-radius: ${props =>
      props.size === "large" ? props.theme.rounded.lg : props.theme.rounded.md};
    background-color: ${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.gray[300]};
    box-shadow: ${props => props.theme.shadow.md};
    z-index: 10;
  `,
  Item: styled.button<IPropsStyle["item"]>`
    display: block;
    width: 100%;
    padding: ${props =>
      props.size === "large" ? "0.75rem" : "0.5rem 0.75rem"};
    font-size: ${props => props.theme.fontSize.body2};
    line-height: ${props => props.theme.lineHeight.body2};
    text-align: left;
    cursor: pointer;
    font-weight: 500;
    outline: 0;
    &:hover {
      outline: 0;
      background-color: ${props => props.theme.color.gray[100]};
    }
  `,
};

interface IPropsDropdown {
  width?: string;
  size?: string;
  isRight?: boolean;
  menu: { id: number; content: string; url: string }[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Dropdown = ({
  width = "12rem",
  size = "large",
  menu,
  isRight = true,
  onClick,
}: IPropsDropdown) => {
  return (
    <Style.Container width={width} size={size} isRight={isRight}>
      {menu.map(item => (
        <Style.Item
          size={size}
          key={item.id}
          data-value={item.url}
          onClick={onClick}
        >
          {item.content}
        </Style.Item>
      ))}
    </Style.Container>
  );
};

export default Dropdown;
