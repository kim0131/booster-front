/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Comment from "@components/templates/comment";
import Snb from "@components/templates/snb";
import { useTopicDetail } from "@core/hook/use-topicdetail";
import useTopicList from "@core/hook/use-topicList";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IPropsSnb {
  snbDatas: {
    id: number;
    category: string;
    menus: { id: number; content: string; param: string }[];
  }[];
  param: string | string[] | undefined;
}

const TopicDetail: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;
  const [topicId, setTopicId] = useState(id);
  const [category, setCategory] = useState();
  const { topicList } = useTopicList();
  const { topicDetail } = useTopicDetail(topicId);
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
    setTopicId(id);
    getTopicList();
    if (topicDetail) {
      setCategory(topicDetail.category);
    }
  }, [category, id, router.query, topicDetail]);

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
    setTopicId(param);
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <>
      <SnbLayout>
        {topicId && (
          <>
            <Snb param={category} />
            <TopicContentLayout id={topicId} data={topicDetail}>
              <Comment id={topicId} />
              {boardDatas && (
                <Board
                  category={category}
                  Datas={boardDatas}
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
