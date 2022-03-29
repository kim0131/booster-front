import useAdsList from "@core/hook/use-Ads";
import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    gap: 3rem;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      max-width: 72rem;
      margin: 0 auto;
      padding: 3rem;
    }
  `,
  Content: styled.div`
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
  Banner: styled.div<any>`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    order: -9999;
    padding: 0 1.25rem;
    ${props => props.theme.screen.md} {
      flex: none;
      width: 20rem;
      order: 9999;
      padding: 0;
    }
  `,
  Dummy: styled.div<any>`
    width: 100%;
    height: 6rem;
    ${props => props.theme.screen.md} {
      width: 20rem;
    }
    background-color: #444;
    background-image: ${props => (props.photo ? `url(${props.photo})` : "")};
  `,
};

interface IPropsHomeLayout {
  children?: React.ReactNode;
  banners?: React.ReactNode;
}

const HomeLayout = ({ children, banners }: IPropsHomeLayout) => {
  const { adsList } = useAdsList();
  console.log(adsList);
  return (
    <Style.Container>
      <Style.Content>{children}</Style.Content>
      <Style.Banner>
        {adsList &&
          adsList.map((item: any) => {
            return (
              <Style.Dummy key={item.id} photo={item.image_url}></Style.Dummy>
            );
          })}
      </Style.Banner>
    </Style.Container>
  );
};

export default HomeLayout;