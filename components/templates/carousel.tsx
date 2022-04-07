import theme from "@components/styles/theme";
import useMainBanner from "@core/hook/use-main-banner";
import { ICarouselData } from "@core/interfaces/carousel";
import styled from "@emotion/styled";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

interface IStyle {
  item: {
    thumbnailColor: string;
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
    display: flex;
    overflow-x: hidden;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  `,
  Item: styled(motion.div)<IStyle["item"]>`
    flex: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    max-width: 20rem;
    height: 26.25rem;
    padding: 1.5rem;
    background-color: ${props => props.thumbnailColor};
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

const sampleDatas = [
  {
    id: 0,
    title: "1",
    content: "테스트",
    url: "https://source.unsplash.com/320x320/?work",
    thumbnailColor: "#bc6321",
  },
  {
    id: 1,
    title: "2",
    content: "테스트",
    url: "https://source.unsplash.com/320x320/?korea",
    thumbnailColor: "#dd5321",
  },
  {
    id: 2,
    title: "더 나은 리더가 되는 법",
    content: "내가 같이 일한 그들보다 더 나아지자",
    url: "https://source.unsplash.com/320x320/?japan",
    thumbnailColor: "#4812bd",
  },
  {
    id: 3,
    title: "그것이 알고싶다",
    content: "스타트업 스톡옵션의 모든 것",
    url: "https://source.unsplash.com/320x320/?asia",
    thumbnailColor: "#222123",
  },
  {
    id: 4,
    title: "5",
    content: "테스트",
    url: "https://source.unsplash.com/320x320/?man",
    thumbnailColor: "#dddddd",
  },
];

const getContrast = (hexColor: string) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);
  var calcContrast = (r * 299 + g * 587 + b * 114) / 1000;
  return calcContrast >= 128 ? true : false;
};

const Item = ({ id, thumbnailColor, title, content, url }: ICarouselData) => {
  const isWhite = getContrast(thumbnailColor);
  return (
    <Style.Item key={id} thumbnailColor={thumbnailColor} url={url}>
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

const Carousel = () => {
  const [state, setState] = useState([0]);
  const { MainBannerList } = useMainBanner();
  console.log(MainBannerList);
  return (
    <Style.Container>
      <LayoutGroup>
        {MainBannerList &&
          MainBannerList.map((data: any) => (
            <Item
              id={data.id}
              key={data.id}
              thumbnailColor={data.thumbnailColor}
              title={data.title}
              content={data.content}
              url={data.image_url}
            />
          ))}
      </LayoutGroup>
    </Style.Container>
  );
};

export default Carousel;
