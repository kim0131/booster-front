import theme from "@components/styles/theme";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const Style = {
  Slider: {
    Container: styled.div`
      width: 100%;
      height: 26.25rem;
      margin: 0 auto;
      background-color: #ddd;
      ${props => props.theme.screen.md} {
        height: 20rem;
      }
    `,
    Wrapper: styled.div``,
    Item: styled.div``,
  },
};

interface IPropsCarousel {
  children?: React.ReactNode;
}

const Carousel = ({ children }: IPropsCarousel) => {
  return <Style.Slider.Container></Style.Slider.Container>;
};

export default Carousel;
