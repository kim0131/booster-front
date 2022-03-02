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

interface IPropsSnbLayout {
  children?: React.ReactNode;
}

const SnbLayout = ({ children }: IPropsSnbLayout) => {
  return <Style>{children}</Style>;
};

export default SnbLayout;
