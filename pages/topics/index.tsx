/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import useCategorySubSide from "@core/hook/use-categorySubSIde";
import useTopicList, { useTopicListFilter } from "@core/hook/use-topicList";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Topics: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { topicList } = useTopicList();
  const { topicListFilter, isValidating } = useTopicListFilter(category);
  const { categorySubSide } = useCategorySubSide("topic");
  const [selectCategory, setCategory] = useState<any>("");

  useEffect(() => {
    setCategory(category);
  }, [category, router]);
  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <>
      {topicList && (
        <SnbLayout>
          {categorySubSide && <Snb category={selectCategory} />}
          {topicListFilter && (
            <Board
              category={selectCategory}
              Datas={category ? topicListFilter : topicList}
              isLoading={false}
              onClickRouter={onClickRouter}
            />
          )}
        </SnbLayout>
      )}
    </>
  );
};

export default Topics;
