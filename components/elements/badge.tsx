import styled from "@emotion/styled";

// Style
interface IPropsStyle {
  size: string;
  color: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Style = styled.div<IPropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: ${props => (props.onClick ? "auto" : "none")};
  height: ${props => (props.size === "large" ? "1.75rem" : "1.25rem")};
  color: ${props =>
    props.color === "primary"
      ? props.theme.color.white
      : props.theme.color.gray[500]};
  background-color: ${props =>
    props.color === "primary"
      ? props.theme.color.blue[600]
      : props.theme.color.gray[100]};
  border-width: 1px;
  border-color: ${props =>
    props.color === "primary"
      ? props.theme.color.blue[600]
      : props.theme.color.gray[100]};
  font-size: ${props =>
    props.size === "large"
      ? props.theme.fontSize.body2
      : props.theme.fontSize.body3};
  line-height: ${props =>
    props.size === "large"
      ? props.theme.lineHeight.body2
      : props.theme.lineHeight.body3};
  padding-left: ${props => (props.size === "large" ? "0.5rem" : "0.25rem")};
  padding-right: ${props => (props.size === "large" ? "0.5rem" : "0.25rem")};
  border-radius: ${props =>
    props.size === "large" ? props.theme.rounded.xs : "2px"};
  gap: ${props => (props.size === "large" ? "4px" : "2px")};
`;

// Component

interface IPropsBadge {
  children?: React.ReactNode;
  variants?: string;
  state?: string;
  size?: string;
  color?: string;
  isLoading?: boolean;
  dataValue?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Badge = ({
  children,
  size = "small",
  color = "gray",
  dataValue = undefined,
  onClick,
}: IPropsBadge) => (
  <Style size={size} color={color} data-value={dataValue} onClick={onClick}>
    {children}
  </Style>
);

export default Badge;
