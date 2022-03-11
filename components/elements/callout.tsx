import styled from "@emotion/styled";

// Style

interface IPropsStyle {
  size: string;
  color: string;
}

const Style = {
  Container: styled.div<IPropsStyle>`
    display: flex;
    align-items: flex-start;
    position: relative;
    background-color: ${props => {
      switch (props.color) {
        case "primary":
          return props.theme.color.blue[50];
        case "success":
          return props.theme.color.green[50];
        case "danger":
          return props.theme.color.red[50];
        default:
          return props.theme.color.gray[100];
      }
    }};
    color: ${props => {
      switch (props.color) {
        case "primary":
          return props.theme.color.blue[600];
        case "success":
          return props.theme.color.green[600];
        case "danger":
          return props.theme.color.red[600];
        default:
          return props.theme.color.gray[900];
      }
    }};
    border-width: 1px;
    border-color: ${props => {
      switch (props.color) {
        case "primary":
          return props.theme.color.blue[300];
        case "success":
          return props.theme.color.green[300];
        case "danger":
          return props.theme.color.red[300];
        default:
          return props.theme.color.gray[300];
      }
    }};
    padding: ${props => {
      switch (props.size) {
        case "large":
          return "23px";
        default:
          return "11px";
      }
    }};
    border-radius: ${props => {
      switch (props.size) {
        case "large":
          return props.theme.rounded.lg;
        default:
          return props.theme.rounded.md;
      }
    }};
    gap: ${props => {
      switch (props.size) {
        case "large":
          return "8px";
        default:
          return "6px";
      }
    }};
    & > svg {
      flex: none;
      width: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          default:
            return "18px";
        }
      }};
      height: ${props => {
        switch (props.size) {
          case "large":
            return "20px";
          default:
            return "18px";
        }
      }};
    }
    & > svg > path {
      fill: ${props => {
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[600];
          case "success":
            return props.theme.color.green[600];
          case "danger":
            return props.theme.color.red[600];
          default:
            return props.theme.color.gray[900];
        }
      }};
    }
  `,

  Wrapper: styled.div`
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,
  Title: styled.div`
    font-size: ${props => props.theme.fontSize.body1};
    line-height: ${props => props.theme.lineHeight.body1};
    font-weight: 700;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    font-size: ${props => props.theme.fontSize.body2};
    line-height: ${props => props.theme.lineHeight.body2};
  `,
  Button: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.75rem;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      flex-wrap: wrap;
    }
  `,
};

// Component

interface IPropsCallout {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  size?: string;
  color?: string;
  button?: React.ReactNode;
}

const Callout = ({
  children,
  icon,
  title,
  button,
  size = "medium",
  color = "gray",
}: IPropsCallout) => (
  <Style.Container size={size} color={color}>
    {icon && icon}
    <Style.Wrapper>
      {title && <Style.Title>{title}</Style.Title>}
      <Style.Content>{children}</Style.Content>
      {button && <Style.Button>{button}</Style.Button>}
    </Style.Wrapper>
  </Style.Container>
);

export default Callout;
