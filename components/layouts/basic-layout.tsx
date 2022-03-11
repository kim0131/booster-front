import { Body1, Header4 } from "@components/elements/types";
import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3rem 1.25rem;
    gap: 3rem;
    ${props => props.theme.screen.md} {
      max-width: 72rem;
      padding: 3rem;
    }
  `,
  Header: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
  Button: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      flex-wrap: wrap;
    }
  `,
};

interface IPropsBasicLayout {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: React.ReactNode;
}

const BasicLayout = ({
  children,
  title,
  description,
  buttons,
}: IPropsBasicLayout) => {
  return (
    <Style.Container>
      <Style.Header>
        {title && <Header4>{title}</Header4>}
        {description && <Body1>{description}</Body1>}
      </Style.Header>
      {children}
      <Style.Button>{buttons}</Style.Button>
    </Style.Container>
  );
};

export default BasicLayout;
