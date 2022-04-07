/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import { useRouter } from "next/router";
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import _ from "lodash";
import { globalNavigation } from "@core/config/navigation";
import useCategoryList from "@core/hook/use-category-list";
import { useCategorySubSide } from "@core/hook/use-category-sub-side";
import { TopicSnbSkeleton } from "@components/layouts/skeleton/topic-skeleton";

interface IPropsTopics {
  initCategory: string;
}

const Topics: NextPage<IPropsTopics> = ({ initCategory }) => {
  const router = useRouter();
  const category = initCategory === "" ? "all" : initCategory;

  const { categorySubSide, isCategorySubSideValidating } =
    useCategorySubSide("topic");

  const { topicListFilter, isTopicListValidating } =
    useTopicListFilter(category);

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <SnbLayout>
      {!isCategorySubSideValidating && categorySubSide ? (
        <Snb category={category} snbDatas={categorySubSide} />
      ) : (
        <TopicSnbSkeleton />
      )}
      {!isCategorySubSideValidating &&
      !isTopicListValidating &&
      topicListFilter ? (
        <Board
          category={category}
          title={
            _.find(categorySubSide[0].menus, { param: category })?.content || ""
          }
          datas={topicListFilter}
          onClickRouter={onClickRouter}
        />
      ) : (
        <Loader color="gray" />
      )}
    </SnbLayout>
  );
};

export default Topics;

export const getServerSideProps: GetServerSideProps = async context => {
  const initCategory = context.query.category || "";
  return { props: { initCategory } };
};
