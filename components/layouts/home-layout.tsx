import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 1.5rem 0;
  `,
  Content: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding-bottom: 6rem;
      ${props => props.theme.screen.md} {
        flex-direction: row;
        width: 100%;
        max-width: 72rem;
        margin: 0 auto;
        padding: 0 3rem;
        padding-bottom: 6rem;
      }
    `,
    Left: styled.div`
      flex: 1 1 0%;
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 3rem;
      order: 9999;
      ${props => props.theme.screen.md} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        order: -9999;
      }
    `,
    Right: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      order: -9999;
      justify-content: center;
      align-items: center;
      padding: 0 1.25rem;
      ${props => props.theme.screen.md} {
        flex: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 20rem;
        order: 9999;
        padding: 0;
      }
    `,
  },
};

interface IPropsHomeLayout {
  carousel?: React.ReactNode;
  banner?: React.ReactNode;
  children?: React.ReactNode;
}

const HomeLayout = ({ carousel, banner, children }: IPropsHomeLayout) => {
  return (
    <Style.Container>
      {carousel}
      <Style.Content.Container>
        <Style.Content.Left>{children}</Style.Content.Left>
        <Style.Content.Right>{banner}</Style.Content.Right>
      </Style.Content.Container>
    </Style.Container>
  );
};

export default HomeLayout;
