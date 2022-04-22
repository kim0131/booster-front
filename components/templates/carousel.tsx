import theme from "@components/styles/theme";
import useMainBanner from "@core/hook/use-main-banner";
import { ICarouselData } from "@core/interfaces/carousel";
import styled from "@emotion/styled";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface IStyle {
  item: {
    thumbnailcolor: string;
    url: string;
  };
  content: {
    color: string;
  };
}

const Style = {
  Container: styled.div`
    width: 100%;
    margin: 0 auto;
    /* display: flex; */
    overflow-x: hidden;
    overflow-y: hidden;
    /* align-items: center; */
    /* justify-content: center; */
    /* gap: 3rem; */
    /* text-align: center; */
  `,
  Item: styled(motion.div)<IStyle["item"]>`
    cursor: pointer;
    flex: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    max-width: 20rem;
    height: 26.25rem;
    padding: 1.5rem;
    background-color: ${props => props.thumbnailcolor};
    background-image: ${props => `url(${props.url})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    border-radius: ${props => props.theme.rounded.lg};
    ${props => props.theme.screen.md} {
      justify-content: flex-end;
      max-width: 40rem;
      height: 20rem;
      background-position: right bottom;
    }
  `,
  Title: styled.div<IStyle["content"]>`
    font-size: ${props => props.theme.fontSize.header4};
    line-height: ${props => props.theme.lineHeight.header4};
    font-weight: 700;
    color: ${props => props.color};
    ${props => props.theme.screen.md} {
      font-size: ${props => props.theme.fontSize.header3};
      line-height: ${props => props.theme.lineHeight.header3};
    }
  `,
  Content: styled.div<IStyle["content"]>`
    font-size: ${props => props.theme.fontSize.body2};
    line-height: ${props => props.theme.lineHeight.body2};
    color: ${props => props.color};
    ${props => props.theme.screen.md} {
      font-size: ${props => props.theme.fontSize.body1};
      line-height: ${props => props.theme.lineHeight.body1};
    }
  `,
};

interface IPropsCarousel {
  datas: ICarouselData[];
}

const getContrast = (hexColor: string) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);
  var calcContrast = (r * 299 + g * 587 + b * 114) / 1000;
  return calcContrast >= 128 ? true : false;
};

const Item = ({
  id,
  thumbnailcolor,
  title,
  content,
  url,
  onClick,
}: ICarouselData) => {
  const isWhite = getContrast(thumbnailcolor);
  return (
    <Style.Item
      key={id}
      thumbnailcolor={thumbnailcolor}
      url={url}
      onClick={onClick}
    >
      <Style.Title color={isWhite ? theme.color.gray[900] : theme.color.white}>
        {title}
      </Style.Title>
      <Style.Content
        color={isWhite ? theme.color.gray[900] : theme.color.white}
      >
        {content}
      </Style.Content>
    </Style.Item>
  );
};

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-track {
    display: flex;
    justify-content: center;
    margin: auto;
    gap: 0.5rem;
  }
  .slick-slide > div {
    display: flex;
    justify-content: center;
  }
  .slick-dots li button:before {
  }
`;

const MainCarousel = () => {
  const [state, setState] = useState([0]);
  const { mainBannerList } = useMainBanner();

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    // dots: true,

    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const onClickRouter = (e: any, data: { url: string; target: string }) => {
    window.open("http://" + data.url, data.target);
  };
  return (
    <Style.Container>
      <StyledSlider {...settings}>
        {mainBannerList &&
          mainBannerList.map((data: any) => (
            <Item
              id={data.id}
              key={data.id}
              thumbnailcolor={data.thumbnailcolor}
              title={data.title}
              content={data.content}
              url={data.image_url}
              onClick={(e: any) => onClickRouter(e, data)}
            />
          ))}
      </StyledSlider>
    </Style.Container>
  );
};

export default MainCarousel;
