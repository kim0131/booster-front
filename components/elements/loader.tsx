import styled from "@emotion/styled";

// Style

interface IPropsStyle {
  container: {
    size: string;
  };
  dot: {
    size: string;
    color: string;
  };
}

const Style = {
  Container: styled.div<IPropsStyle["container"]>`
    display: flex;
    gap: ${props => {
      switch (props.size) {
        case "large":
          return "0.5rem";
        case "small":
          return "0.25rem";
        default:
          return "0.375rem";
      }
    }};
  `,
  Dot: styled.div<IPropsStyle["dot"]>`
    width: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
    height: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
    border-radius: ${props => props.theme.rounded.full};
    background-color: ${props => {
      switch (props.color) {
        case "gray":
          return props.theme.color.gray[900];
        case "primary":
          return props.theme.color.blue[600];
        case "success":
          return props.theme.color.green[600];
        case "danger":
          return props.theme.color.red[600];
        case "white":
          return props.theme.color.white;
        default:
          return props.theme.color.white;
      }
    }};
  `,
};

// Component

interface IPropsLoader {
  size?: string;
  color?: string;
}

const Loader = ({ size = "medium", color = "white" }: IPropsLoader) => (
  <Style.Container size={size}>
    <Style.Dot size={size} color={color} />
    <Style.Dot size={size} color={color} />
    <Style.Dot size={size} color={color} />
  </Style.Container>
);

export default Loader;
