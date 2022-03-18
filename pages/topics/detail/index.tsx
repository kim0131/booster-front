/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import { useTopicDetail } from "@core/hook/use-topicdetail";
import { useTopicListFilter } from "@core/hook/use-topicList";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopicComment from "@components/templates/topic-comment";

const TopicDetail: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;
  const [topicId, setTopicId] = useState(id);
  const [category, setCategory] = useState();
  const { topicDetail } = useTopicDetail(topicId);
  const { topicListFilter } = useTopicListFilter(category);

  useEffect(() => {
    setTopicId(id);
    if (topicDetail) {
      setCategory(topicDetail.category);
    }
  }, [category, router, topicDetail]);

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <>
      <SnbLayout>
        {topicDetail && (
          <>
            <Snb category={category} />
            <TopicContentLayout id={topicId} data={topicDetail}>
              <TopicComment id={topicId} />
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
    </>
  );
};

export default TopicDetail;
