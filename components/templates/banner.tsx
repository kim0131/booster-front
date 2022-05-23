import { HomeSkeletonBannerLayout } from "@components/layouts/skeleton/home-skeleton";
import useAdsList from "@core/hook/use-ads";
import styled from "@emotion/styled";
import React from "react";

interface IStyle {
  thumbnail?: string;
  color?: string;
}

const Style = styled.div<IStyle>`
  width: 100%;
  height: 6rem;
  /* background-color: #ddd; */
  background-image: ${props => `url(${props.thumbnail})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #ddd;
  cursor: pointer;
  border-radius: ${props => props.theme.rounded.lg};
`;

const Banner = () => {
  const { adsList } = useAdsList();
  const onClickBanner = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    window.open("http://" + link, "_blank");
  };

  return adsList ? (
    adsList.map((ad: any) => (
      <Style
        key={ad.id}
        thumbnail={ad.imageUrl}
        data-value={ad.url}
        onClick={onClickBanner}
      />
    ))
  ) : (
    <HomeSkeletonBannerLayout />
  );
};

export default Banner;
