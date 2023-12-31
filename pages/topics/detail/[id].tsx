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
import { useCategorySubSide } from "@core/hook/use-category-sub-side";
import _ from "lodash";
import useHistoryState from "@core/hook/use-history-state";

const TopicDetail: NextPage = () => {
  const router = useRouter();
  const urlCategory = router.query.category;
  const [category, setCategory] = useHistoryState(
    urlCategory ? urlCategory : "all",
    "category",
  );
  const { id } = router.query;
  const { topicDetail } = useTopicDetail(id);
  const { topicListFilter } = useTopicListFilter(urlCategory);
  const { categorySubSide } = useCategorySubSide("topic");

  const onClickRouter = (param: any) => {
    if (param.sector == "topics") {
      router.push(
        `/${param.sector}/detail/${param.idx}?category=${urlCategory}`,
      );
    } else {
      router.push(`/${param.sector}/${param.idx}`);
    }
  };
  return (
    <SnbLayout>
      {topicDetail && (
        <>
          {topicListFilter && (
            <>
              {id && (
                <>
                  <Snb
                    category={urlCategory}
                    snbDatas={categorySubSide}
                    setCategory={setCategory}
                  />
                  <TopicContentLayout id={router.query.id} data={topicDetail}>
                    <TopicComment id={id} />
                    {categorySubSide && (
                      <Board
                        category={urlCategory}
                        title={
                          _.find(categorySubSide[0].menus, {
                            param: urlCategory,
                          })?.content || ""
                        }
                        datas={topicListFilter}
                        onClickRouter={onClickRouter}
                      />
                    )}
                  </TopicContentLayout>
                </>
              )}
            </>
          )}
        </>
      )}
    </SnbLayout>
  );
};

export default TopicDetail;
