import { useState } from "react";
import styled from "@emotion/styled";
import { motion, useMotionValue } from "framer-motion";
import theme from "@components/styles/theme";
import useMainBanner from "@core/hook/use-main-banner";
import { ICarouselData } from "@core/interfaces/carousel";

interface IStyleItem {
  color: string;
  isHide: boolean;
}

const Style = {
  Container: styled.div`
    overflow-x: hidden;
  `,
  Viewport: styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  `,
  Item: styled(motion.div)<IStyleItem>`
    width: 40rem;
    height: 20rem;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.color};
    visibility: ${props => (props.isHide ? "hidden" : "visible")};
  `,
};

const getContrast = (hexColor: string) => {
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);
  var calcContrast = (r * 299 + g * 587 + b * 114) / 1000;
  return calcContrast >= 128 ? true : false;
};

const Carousel = () => {
  const { mainBannerList } = useMainBanner();
  const [state, setState] = useState([
    "#33a",
    "#8c9",
    "#f3e074",
    "#dddeee",
    "#f35293",
  ]);
  console.log(mainBannerList);
  const x = useMotionValue(0);

  const onPrev = () => {
    const first = state.pop()!;
    console.log(state, first);
    setState([first, ...state]);
  };

  const onNext = () => {
    const first = state.shift()!;
    state.push(first);
    setState([...state]);
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    console.log(offset.x);
    if (offset.x >= 128) {
      onPrev();
      return;
    } else if (offset.x <= -128) {
      onNext();
      return;
    }
  };

  return (
    <Style.Container>
      <Style.Viewport>
        {state.map((item, idx) => (
          <Style.Item
            key={item}
            color={item}
            layout
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            style={{ x }}
            isHide={idx === 0 || idx + 1 === state.length}
          >
            {item} -{idx + 1}
          </Style.Item>
        ))}
      </Style.Viewport>
    </Style.Container>
    // <Style.Container>
    //   <StyledSlider {...settings}>
    //     {mainBannerList &&
    //       mainBannerList.map((data: any) => (
    //         <Item
    //           id={data.id}
    //           key={data.id}
    //           thumbnailcolor={data.thumbnailcolor}
    //           title={data.title}
    //           content={data.content}
    //           url={data.image_url}
    //           // onClick={(e: any) => onClickRouter(e, data)}
    //         />
    //       ))}
    //   </StyledSlider>
    // </Style.Container>
  );
};

export default Carousel;
