/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import { useTopicDetail } from "@core/hook/use-topic-detail";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import TopicComment from "@components/templates/topic-comment";
import { useCategorySubSide } from "@core/hook/use-category-subSIde";

const TopicDetail: NextPage = () => {
  const router = useRouter();
  const [category, setCategory] = useState();
  const { topicDetail } = useTopicDetail(router.query.id);
  const { topicListFilter } = useTopicListFilter(topicDetail?.category);
  const { categorySubSide } = useCategorySubSide("topic");

  // let { id } = router.query;
  // const [topicId, setTopicId] = useState(id);

  // useEffect(() => {
  //   setTopicId(id);
  //   if (topicDetail) {
  //     setCategory(topicDetail.category);
  //   }
  // }, [category, router, topicDetail]);

  // const [category, setCategory] = useState();
  // const { topicDetail } = useTopicDetail(router.query.id);
  // const { topicListFilter } = useTopicListFilter(category);

  // useEffect(() => {
  // setTopicId(id);
  // if (topicDetail) {
  //   setCategory(topicDetail.category);
  // }
  // }, [category, router, topicDetail]);

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <SnbLayout>
      {topicDetail && (
        <>
          <Snb category={category} snbDatas={categorySubSide} />
          <TopicContentLayout id={router.query.id} data={topicDetail}>
            <TopicComment id={router.query.id} />
            {topicListFilter && (
              <Board
                category={category}
                Datas={topicListFilter}
                onClickRouter={onClickRouter}
              />
            )}
          </TopicContentLayout>
        </>
      )}
    </SnbLayout>
  );
};

export default TopicDetail;
