import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "@components/styles/theme";
import useMainBanner from "@core/hook/use-main-banner";
import { ICarouselData } from "@core/interfaces/carousel";
import { useDesktop } from "@core/hook/use-desktop";
import useInterval from "@core/hook/use-interval";
import Button from "@components/elements/button";
import { IconChevronLeft, IconChevronRight } from "@components/icons";
import { HomeSkeletonCarouselLayout } from "@components/layouts/skeleton/home-skeleton";

const TRANSITION_TIME = 300;
const TRANSITION_INTERVAL = 5000;

interface IStyle {
  currentPage?: number;
  itemSize?: number;
  thumbnailColor?: string;
  transitionTime?: number;
  dragX?: number;
  imageUrl?: string;
  isCurrent?: boolean;
  color?: string;
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  Carousel: {
    Container: styled.div`
      overflow-x: hidden;
      position: relative;
    `,
    PrevButton: styled.div`
      position: absolute;
      width: 3rem;
      height: 3rem;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      ${props => props.theme.screen.md} {
        left: 3rem;
      }
    `,
    NextButton: styled.div`
      position: absolute;
      width: 3rem;
      height: 3rem;
      right: 1.5rem;
      ${props => props.theme.screen.md} {
        right: 3rem;
      }
      top: 50%;
      transform: translateY(-50%);
    `,

    Viewport: styled.div<IStyle>`
      display: flex;
      transform: ${props =>
        `translateX(calc(50% - ${props.itemSize}px * (1.5 + ${
          props.currentPage
        }) + ${props.dragX || 0}px))`};
      transition-property: transform;
      transition-duration: ${props => `${props.transitionTime}ms`};
    `,
  },
  Item: {
    Container: styled.div<IStyle>`
      width: 20rem;
      height: 20rem;
      flex: none;
      padding: 0 0.375rem;
      box-sizing: content-box;

      ${props => props.theme.screen.md} {
        width: 40rem;
        height: 20rem;
        padding: 0 0.75rem;
      }
    `,
    Wrapper: styled.div<IStyle>`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1.5rem;
      cursor: pointer;
      border-radius: ${props => props.theme.rounded.lg};
      background-color: ${props => props.thumbnailColor};
      background-image: ${props => `url(${props.imageUrl})`};
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
      ${props => props.theme.screen.md} {
        justify-content: flex-end;
        background-position: right bottom;
      }
      & > * {
        cursor: pointer;
      }
    `,
    Title: styled.div<IStyle>`
      font-size: ${props => props.theme.fontSize.header4};
      line-height: ${props => props.theme.lineHeight.header4};
      ${props => props.theme.screen.md} {
        font-size: ${props => props.theme.fontSize.header3};
        line-height: ${props => props.theme.lineHeight.header3};
      }
      font-weight: 700;
      color: ${props => (props.color ? props.color : "inherit")};
      cursor: pointer;
    `,
    Content: styled.div<IStyle>`
      font-size: ${props => props.theme.fontSize.body1};
      line-height: ${props => props.theme.lineHeight.body1};
      color: ${props => (props.color ? props.color : "inherit")};
      cursor: pointer;
    `,
  },
  Pagination: {
    Container: styled.div`
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      padding: 0 1.25rem;
    `,
    Indicator: styled.div<IStyle>`
      width: 2.5rem;
      height: 0.25rem;
      cursor: pointer;
      background-color: ${props =>
        props.isCurrent
          ? props.theme.color.blue[600]
          : props.theme.color.gray[300]};
      border-radius: ${props => props.theme.rounded.full};
    `,
  },
};

const getItemIndex = (index: number, length: number) => {
  index -= 2;
  if (index < 0) {
    index += length;
  } else if (index >= length) {
    index -= length;
  }
  return index + 1;
};

const getContrast = (hexColor: string) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);
  var calcContrast = (r * 299 + g * 587 + b * 114) / 1000;
  return calcContrast >= 128 ? true : false;
};

const getClientX = (event: any) => {
  return event._reactName == "onTouchStart"
    ? event.touches[0].clientX
    : event._reactName == "onTouchMove" || event._reactName == "onTouchEnd"
    ? event.changedTouches[0].clientX
    : event.clientX;
};

interface IStateCarousel {
  pages?: ICarouselData[];
  currentPage: number;
  isLoading: boolean;
  transitionTime: number;
}

const Carousel = () => {
  const { isDesktop } = useDesktop();
  const { mainBannerList } = useMainBanner();

  const [move, setMove] = useState(false);
  const [isHandled, setIsHandled] = useState(false);
  const [originX, setOriginX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [state, setState] = useState<IStateCarousel>({
    pages: [],
    currentPage: 1,
    isLoading: true,
    transitionTime: TRANSITION_TIME,
  });

  useEffect(() => {
    if (mainBannerList) {
      let addedFront = [];
      let addedLast = [];
      var index = 0;
      while (index < 2) {
        addedLast.push(mainBannerList[index % mainBannerList.length]);
        addedFront.unshift(
          mainBannerList[
            mainBannerList.length - 1 - (index % mainBannerList.length)
          ],
        );
        index++;
      }
      console.log([...addedFront, ...mainBannerList, ...addedLast]);
      setState({
        ...state,
        pages: [...addedFront, ...mainBannerList, ...addedLast],
        currentPage: 1,
        isLoading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainBannerList]);

  const onItemMove = (amount: number) => {
    setMove(true);
    setState({
      ...state,
      currentPage: state.currentPage + amount,
      transitionTime: TRANSITION_TIME,
    });
    if (state.currentPage + amount > mainBannerList.length) {
      setTimeout(() => {
        setState({ ...state, currentPage: 1, transitionTime: 0 });
      }, TRANSITION_TIME);
    }
    if (state.currentPage + amount <= 0) {
      setTimeout(() => {
        setState({
          ...state,
          currentPage: mainBannerList.length,
          transitionTime: 0,
        });
      }, TRANSITION_TIME);
    }
    setTimeout(() => {
      setMove(false);
    }, TRANSITION_TIME);
  };

  const handleTouchStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setOriginX(getClientX(e));
  };

  const handleTouchMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (originX) {
      setDragX(getClientX(e) - originX);
    }
  };

  const handleMouseSwipe = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (dragX) {
      const currentTouchX = getClientX(e);
      if (originX > currentTouchX + 100) {
        onItemMove(1);
      } else if (originX < currentTouchX - 100) {
        onItemMove(-1);
      }
      setDragX(0);
    }
    setOriginX(0);
  };

  useInterval(
    () => {
      onItemMove(1);
    },
    !move && !isHandled ? TRANSITION_INTERVAL : null,
  );
  const onClickRouter = (e: any, url: any) => {
    if (move) {
      e.stopPropagation();
      return;
    }
    window.open("http://" + url);
  };
  return state.isLoading ? (
    <HomeSkeletonCarouselLayout />
  ) : (
    <Style.Container>
      <Style.Carousel.Container>
        <Style.Carousel.Viewport
          currentPage={state.currentPage}
          itemSize={isDesktop ? 664 : 332}
          dragX={dragX}
          transitionTime={state.transitionTime}
          onMouseOver={() => setIsHandled(true)}
          onMouseOut={() => setIsHandled(false)}
        >
          {state.pages?.map((item: ICarouselData, idx: number) => {
            const itemIndex = getItemIndex(idx, state.pages?.length || 1);
            return (
              <Style.Item.Container
                key={itemIndex}
                onMouseDown={handleTouchStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onMouseMove={handleTouchMove}
                onMouseUp={handleMouseSwipe}
                onTouchEnd={handleMouseSwipe}
                onMouseLeave={handleMouseSwipe}
              >
                <Style.Item.Wrapper
                  thumbnailColor={item.thumbnailColor}
                  imageUrl={item.imageUrl}
                  onClick={(e: any) => onClickRouter(e, item.url)}
                >
                  <Style.Item.Title
                    color={
                      getContrast(item.thumbnailColor)
                        ? theme.color.gray[900]
                        : theme.color.white
                    }
                  >
                    {item.title}
                  </Style.Item.Title>
                  <Style.Item.Content
                    color={
                      getContrast(item.thumbnailColor)
                        ? theme.color.gray[900]
                        : theme.color.white
                    }
                  >
                    {item.content}
                  </Style.Item.Content>
                </Style.Item.Wrapper>
              </Style.Item.Container>
            );
          })}
        </Style.Carousel.Viewport>
        <Style.Carousel.PrevButton onClick={() => !move && onItemMove(-1)}>
          <Button size="large" isRounded>
            <IconChevronLeft />
          </Button>
        </Style.Carousel.PrevButton>
        <Style.Carousel.NextButton onClick={() => !move && onItemMove(1)}>
          <Button size="large" isRounded>
            <IconChevronRight size={40} />
          </Button>
        </Style.Carousel.NextButton>
      </Style.Carousel.Container>
      <Style.Pagination.Container>
        {mainBannerList.map((item: ICarouselData, idx: number) => (
          <Style.Pagination.Indicator
            key={idx + 1}
            isCurrent={
              state.currentPage === idx + 1 ||
              state.currentPage === idx + mainBannerList.length + 1 ||
              state.currentPage === idx - mainBannerList.length + 1
            }
            onClick={() => onItemMove(idx + 1 - state.currentPage)}
          />
        ))}
      </Style.Pagination.Container>
    </Style.Container>
  );
};

export default Carousel;
