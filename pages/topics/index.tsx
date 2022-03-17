/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import useCategorySubSide from "@core/hook/use-categorySubSIde";
import useHotTopic from "@core/hook/use-hottopic";
import useTopicList, { useTopicListFilter } from "@core/hook/use-topicList";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Topics: NextPage = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const { category } = router.query;
  const { topicList, topickListMutate } = useTopicList();
  const { topicListFilter } = useTopicListFilter(category);
  const { categorySubSide } = useCategorySubSide("topic");
  const { hotTopic } = useHotTopic();
  const [selectCategory, setCategory] = useState<any>("");
  const [boardDatas, setBoardDatas] = useState<any>();

  useEffect(() => {
    setCategory(category);
    selectBoardDatas();
  }, [category, router, topicListFilter, topicList, hotTopic]);

  const selectBoardDatas = () => {
    if (category == undefined || category == "전체") {
      setCategory("전체");
      setBoardDatas(topicList);
    } else if (category == "인기글") {
      setBoardDatas(hotTopic);
    } else {
      setBoardDatas(topicListFilter);
    }
  };

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  const onClickScrap = async (id: any, bookmark: any) => {
    if (bookmark) {
      await axios.post(`/api2/topic/scrap/cancel/${id}`, {
        member_idx: session?.user?.idx,
        sector: "topic",
      });
    } else {
      await axios.post(`/api2/topic/scrap/insert/${id}`, {
        member_idx: session?.user?.idx,
        sector: "topic",
      });
    }
  };

  return (
    <>
      {topicList && (
        <SnbLayout>
          {categorySubSide && <Snb category={selectCategory} />}
          {Boolean(boardDatas) && (
            <Board
              category={selectCategory}
              Datas={category ? boardDatas : topicList}
              isLoading={false}
              onClickRouter={onClickRouter}
              onClickScrap={onClickScrap}
            />
          )}
          {Boolean(!boardDatas) && <Loader color="gray"></Loader>}
        </SnbLayout>
      )}
    </>
  );
};

export default Topics;
