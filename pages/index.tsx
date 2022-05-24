import type { NextPage } from "next";
import Carousel from "@components/templates/carousel";
import HomeLayout from "@components/layouts/home-layout";
import BoardWidget from "@components/templates/board-widget";
import { useHotTopic } from "@core/hook/use-hot-topic";
import { useCategoryListHome } from "@core/hook/use-category-list";
import { useEffect } from "react";
import { HomeSkeletonBoardWidgetLayout } from "@components/layouts/skeleton/home-skeleton";
import Banner from "@components/templates/banner";
import axios from "axios";
import Button from "@components/elements/button";

const Home: NextPage = () => {
  const { hotTopic } = useHotTopic();
  const { categoryListHome } = useCategoryListHome();
  useEffect(() => {
    localStorage.removeItem("category");
  });
  const test = async () => {
    await axios.post("/api3/test").then(res => {
      console.log(res);
    });
  };
  return (
    <HomeLayout carousel={<Carousel />} banner={<Banner />}>
      {categoryListHome && hotTopic ? (
        <>
          <BoardWidget
            title="인기 토픽"
            url="hot"
            col={2}
            datas={hotTopic}
            isHotTopic
          />
          {categoryListHome.map((data: any) => {
            return (
              <BoardWidget
                title={data.bo_subject}
                col={1}
                url={data.bo_table}
                datas={data.contents}
                key={data.idx}
              />
            );
          })}
        </>
      ) : (
        <HomeSkeletonBoardWidgetLayout />
      )}
      <Button onClick={test} />
    </HomeLayout>
  );
};

export default Home;
