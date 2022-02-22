import styled from "@emotion/styled";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.screen.md} {
    flex-direction: row;
    max-width: 72rem;
    margin: auto;
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
