import Skeleton from "@components/elements/skeleton";
import styled from "@emotion/styled";

const Style = {
  Carousel: styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.theme.screen.md} {
      flex-direction: row;
      max-width: 72rem;
      margin: 0 auto;
      gap: 3rem;
      padding: 3rem;
    }
    & > * {
      ${props => props.theme.screen.md} {
      }
    }
  `,
  Widget: styled.div`
    flex: none;
    width: 12rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  SubMenu: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
};

interface IPropsHomeSkeletonLayout {
  children?: React.ReactNode;
}

export const HomeSkeletonCarouselLayout = ({
  children,
}: IPropsHomeSkeletonLayout) => {
  return <Style.Carousel>{children}</Style.Carousel>;
};

export const BestWidgetskelton = () => {
  return (
    <>
      <Style.Widget>
        <Style.SubMenu>
          <Skeleton width="6rem" height="1rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </Style.SubMenu>
      </Style.Widget>
      <Style.Widget>
        <Style.SubMenu>
          <Skeleton width="6rem" height="1rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </Style.SubMenu>
      </Style.Widget>
      <Style.Widget>
        <Style.SubMenu>
          <Skeleton width="6rem" height="1rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </Style.SubMenu>
      </Style.Widget>
      <Style.Widget>
        <Style.SubMenu>
          <Skeleton width="6rem" height="1rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </Style.SubMenu>
      </Style.Widget>
    </>
  );
};
