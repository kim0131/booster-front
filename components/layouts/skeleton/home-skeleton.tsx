import Skeleton from "@components/elements/skeleton";
import { useDesktop } from "@core/hook/use-desktop";
import styled from "@emotion/styled";

interface IStyle {
  col?: number;
}

const Style = {
  Carousel: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    `,
    Wrapper: styled.div`
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      overflow: hidden;
      & > * {
        flex: none;
      }
    `,
    Pagination: styled.div`
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      padding: 0 1.25rem;
    `,
  },
  BoardWidget: {
    Container: styled.div<IStyle>`
      grid-column: span 1 / span 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      ${props => props.theme.screen.md} {
        grid-column: ${props => `span ${props.col} / span ${props.col}`};
      }
    `,
    Header: styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.25rem;
      ${props => props.theme.screen.md} {
        padding: 0;
      }
    `,
    Content: {
      Container: styled.div`
        display: flex;
        padding: 0 1.25rem;
        flex-direction: column;
        gap: 0.5rem;
        ${props => props.theme.screen.md} {
          flex-direction: row;
          padding: 0;
          gap: 0.75rem;
        }
      `,
      Badge: styled.div`
        width: 100%;
        max-width: 4rem;
      `,
      Title: styled.div`
        flex: 1 1 0%;
      `,
    },
  },
};

export const HomeSkeletonCarouselLayout = () => {
  const { isDesktop } = useDesktop();
  return (
    <Style.Carousel.Container>
      <Style.Carousel.Wrapper>
        <Skeleton width={isDesktop ? "40rem" : "20rem"} height="20rem" />
        <Skeleton width={isDesktop ? "40rem" : "20rem"} height="20rem" />
        <Skeleton width={isDesktop ? "40rem" : "20rem"} height="20rem" />
      </Style.Carousel.Wrapper>
      <Style.Carousel.Pagination>
        <Skeleton width="2.5rem" height="0.25rem" />
        <Skeleton width="2.5rem" height="0.25rem" />
        <Skeleton width="2.5rem" height="0.25rem" />
      </Style.Carousel.Pagination>
    </Style.Carousel.Container>
  );
};

export const HomeSkeletonBoardWidgetLayout = () => {
  return (
    <>
      <Style.BoardWidget.Container col={2}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
      <Style.BoardWidget.Container col={1}>
        <Style.BoardWidget.Header>
          <Skeleton width="5rem" height="2.75rem" />
          <Skeleton width="4.5rem" height="2rem" />
        </Style.BoardWidget.Header>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
        <Style.BoardWidget.Content.Container>
          <Style.BoardWidget.Content.Badge>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Badge>
          <Style.BoardWidget.Content.Title>
            <Skeleton width="100%" height="1.5rem" />
          </Style.BoardWidget.Content.Title>
        </Style.BoardWidget.Content.Container>
      </Style.BoardWidget.Container>
    </>
  );
};

export const HomeSkeletonBannerLayout = () => {
  return (
    <>
      <Skeleton width="100%" height="6rem" />
      <Skeleton width="100%" height="6rem" />
    </>
  );
};
