import styled from "@emotion/styled";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.screen.md} {
    max-width: 72rem;
    margin: 0 auto;
    gap: 3rem;
    padding: 3rem;
  }
`;

interface IPropsLnbLayout {
  children?: React.ReactNode;
}

const LnbLayout = ({ children }: IPropsLnbLayout) => {
  return <Style>{children}</Style>;
};

export default LnbLayout;
