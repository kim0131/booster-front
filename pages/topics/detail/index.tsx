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
import { config } from "process";
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
  let { id } = router.query;
  const [category, setCategory] = useState();
  const [topicContent, setTopicContent] = useState();
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
      likeCnt: 0,
    },
  ]);
  const { data: topic } = useSWR(`/api2/topic/list`, topicfetcher);
  const { data, isValidating } = useSWR(`/api2/topic/list/${id}`, topicDetail, {
    onSuccess: (data, key, config) => {
      if (topic) {
        let result = topic.filter((content: any) => {
          if (data.category) {
            return content.category == category;
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
      setTopicContent(data);
      setCategory(data.category);
    },
  });

  useEffect(() => {
    getTopicList();
  }, [category]);

  const getTopicList = () => {
    if (topic) {
      let result = topic.filter((content: any) => {
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
      setBoardDatas(topic);
    }
  };

  return (
    <>
      <SnbLayout>
        {topicContent && (
          <>
            <Snb param={category} />
            <TopicContentLayout id={id} data={topicContent}>
              <Comment id={id} />
              {topicContent && (
                <Board
                  category={category}
                  Datas={boardDatas}
                  isLoading={isLoading}
                />
              )}
            </TopicContentLayout>
          </>
        )}
        {!topicContent && <Loader color={"black"} />}
      </SnbLayout>
    </>
  );
};

export default TopicDetail;
