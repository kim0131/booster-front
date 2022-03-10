/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Comment from "@components/templates/comment";
import Snb from "@components/templates/snb";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";
import { topicDetail, topicfetcher } from "@core/swr/topicfetch";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
  let Category = router.query.category;
  let { id } = router.query;
  const { data: topic } = useSWR(`/api2/topic/list`, topicfetcher);
  const { data: topicContent } = useSWR(`/api2/topic/list/${id}`, topicDetail);
  const [isLoading, setLoading] = useState<any>();
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
    },
  ]);

  useEffect(() => {
    if (topic && topicContent) {
      getTopiceContent();
    }
  }, [Category, topic, topicContent]);

  const getTopiceContent = async () => {
    if (topic) {
      let result = topic.filter((content: any) => {
        if (Category) {
          return content.category == topicContent.category;
        } else {
          return true;
        }
      });
      if (result) {
        setBoardDatas(result);
      }
    } else {
      setBoardDatas(topic);
    }
  };

  return (
    <>
      <SnbLayout>
        <Snb param={Category} />
        {isLoading ? (
          <Loader color="gray" />
        ) : (
          <TopicContentLayout id={id} data={topicContent}>
            <Comment id={id} />
            {topicContent && (
              <Board
                category={topicContent.category}
                Datas={boardDatas}
                isLoading={isLoading}
              />
            )}
          </TopicContentLayout>
        )}
      </SnbLayout>
    </>
  );
};

export default TopicDetail;
