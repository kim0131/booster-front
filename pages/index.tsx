import type { NextPage } from "next";
import Carousel from "@components/templates/carousel";
import HomeLayout from "@components/layouts/home-layout";
import BestWidget from "@components/templates/best-widget";
import { useHotTopic } from "@core/hook/use-hot-topic";
import { useCategoryListHome } from "@core/hook/use-category-list";
import MainCarousel from "@components/templates/carousel";
import { BestWidgetskelton } from "@components/layouts/skeleton/home-skeleton";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { hotTopic } = useHotTopic();
  const { categoryListHome } = useCategoryListHome();
  useEffect(() => {
    console.log("rendered Test");
    localStorage.removeItem("category");
  }, ["category"]);
  return (
    <>
      <MainCarousel />
      <HomeLayout>
        {hotTopic && (
          <BestWidget title="인기 토픽" url="hot" col={2} datas={hotTopic} />
        )}
        {categoryListHome &&
          categoryListHome.map((data: any) => {
            return (
              <BestWidget
                title={data.bo_subject}
                col={1}
                url={data.bo_table}
                datas={data.contents}
                key={data.idx}
              />
            );
          })}
        {!categoryListHome && <BestWidgetskelton />}
      </HomeLayout>
    </>
  );
};

export default Home;
