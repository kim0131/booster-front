/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useCategorySubSide } from "@core/hook/use-category-subSIde";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import { useRouter } from "next/router";
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import { useHotTopic } from "@core/hook/use-hot-topic";

const Topics: NextPage = () => {
  const router = useRouter();
  const { hotTopic } = useHotTopic();
  const { categorySubSide } = useCategorySubSide("topic");
  const { category } = router.query || "";
  const { topicListFilter, isValidating } = useTopicListFilter(category);

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  console.log(categorySubSide, category);

  return (
    <SnbLayout>
      {topicListFilter && (
        <>
          {categorySubSide && (
            <Snb category={category} snbDatas={categorySubSide} />
          )}

          <Board
            category={category}
            Datas={category == "인기글" ? hotTopic : topicListFilter}
            onClickRouter={onClickRouter}
          />
        </>
      )}

      {isValidating && <Loader color="gray"></Loader>}
    </SnbLayout>
  );
};

export default Topics;
