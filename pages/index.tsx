import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import Carousel from "@components/templates/carousel";
import HomeLayout from "@components/layouts/home-layout";
import BestWidget from "@components/templates/best-widget";
import useHotTopic from "@core/hook/use-hottopic";
import React from "react";
import { useCategoryListHome } from "@core/hook/use-catagorylist";

const Home: NextPage = () => {
  const { hotTopic } = useHotTopic();
  const { categoryListHome } = useCategoryListHome();

  return (
    <>
      <Carousel />
      <HomeLayout>
        {hotTopic && (
          <BestWidget title="인기 토픽" url="인기글" col={2} datas={hotTopic} />
        )}
        {categoryListHome &&
          categoryListHome.map((data: any) => {
            return (
              <React.Fragment key={data.idx}>
                <BestWidget
                  title={data.bo_subject}
                  col={1}
                  url={data.bo_subject}
                  datas={data.contents}
                />
              </React.Fragment>
            );
          })}
      </HomeLayout>
    </>
  );
};

export default Home;
