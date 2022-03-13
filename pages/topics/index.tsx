/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import useTopicList from "@core/hook/use-topicList";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Topics: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { topicList} =  useTopicList();
  const [topiclist, setTopicList] = useState(topicList) 
  const [boardDatas, setBoardDatas] = useState([
    {
      id: 0,
      category: "0",
      title: "0",
      content: "0",
      writer: "0",
      like: 0,
      view: 0,
      comments: 0,
      bookmark: false,
      create: 0,
      likeCnt: 0,
    },
  ]);
  useEffect(() => {
    getTopicList();
    setTopicList(topicList)
  }, [category, router, topicList, topiclist]);



  const getTopicList = () => {
    if (topicList) {
      let result = topicList.filter((content: any) => {
        if (category) {
          return content.category == category;
        } else {
          return true;
        }
      });
      if (result) {
        setBoardDatas(result);
      }
    } else {
      setBoardDatas(topicList);
    }
  };

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <>
      <SnbLayout>
        <Snb param={category} />
        {boardDatas && (
          <Board
            category={category}
            Datas={boardDatas}
            isLoading={false}
            onClick={onClickRouter}
          />
        )}
      </SnbLayout>
    </>
  );
};

export default Topics;
