import type { NextPage } from "next";
import Carousel from "@components/templates/carousel";
import HomeLayout from "@components/layouts/home-layout";
import BestWidget from "@components/templates/best-widget";
import { useHotTopic } from "@core/hook/use-hottopic";
import { useCategoryListHome } from "@core/hook/use-catagorylist";
import Skeleton from "@components/elements/skeleton";

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
              <BestWidget
                title={data.bo_subject}
                col={1}
                url={data.bo_subject}
                datas={data.contents}
                key={data.idx}
              />
            );
          })}
      </HomeLayout>
    </>
  );
};

export default Home;
