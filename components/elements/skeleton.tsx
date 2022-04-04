import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Style

interface IPropsStyle {
  width: string;
  height: string;
  isRounded: boolean;
}

const fadeAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Style = styled.div<IPropsStyle>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props =>
    props.isRounded ? "9999px" : props.theme.rounded.md};
  background-color: ${props => props.theme.color.gray[200]};
  animation: ${fadeAnimation} 2s infinite linear;
`;
// Component

interface IPropsSkeleton {
  width?: string;
  height?: string;
  isRounded?: boolean;
}

const Skeleton = ({
  width = "auto",
  height = "3rem",
  isRounded = false,
}: IPropsSkeleton) => (
  <Style width={width} height={height} isRounded={isRounded} />
);

export default Skeleton;
