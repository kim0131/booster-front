/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCategorySubSide } from "@core/hook/use-category-subSIde";
import { useHotTopic } from "@core/hook/use-hottopic";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import { useRouter } from "next/router";
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";

const Topics: NextPage = () => {
  const router = useRouter();
  const { hotTopic } = useHotTopic();
  const { categorySubSide } = useCategorySubSide("topic");
  const { category } = router.query;
  const [selectCategory, setCategory] = useState<any>("");
  const { topicListFilter, isValidating } = useTopicListFilter(selectCategory);

  useEffect(() => {
    setCategory(category);
  }, [category, router, topicListFilter, hotTopic]);

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <SnbLayout>
      {categorySubSide && (
        <Snb category={selectCategory} snbDatas={categorySubSide} />
      )}
      {topicListFilter && (
        <>
          {!isValidating && (
            <Board
              category={selectCategory}
              Datas={category == "인기글" ? hotTopic : topicListFilter}
              onClickRouter={onClickRouter}
            />
          )}
        </>
      )}
      {isValidating && <Loader color="gray"></Loader>}
    </SnbLayout>
  );
};

export default Topics;
