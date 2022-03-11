import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3rem 1.25rem;
    gap: 1.5rem;
    ${props => props.theme.screen.md} {
      max-width: 72rem;
      padding: 3rem;
    }
  `,
  Button: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      justify-content: space-between;
    }
  `,
};

interface IPropsProfileLayout {
  children?: React.ReactNode;
  buttons?: React.ReactNode;
}

const ProfileLayout = ({ children, buttons }: IPropsProfileLayout) => {
  return (
    <Style.Container>
      {children}
      <Style.Button>{buttons}</Style.Button>
    </Style.Container>
  );
};

export default ProfileLayout;
