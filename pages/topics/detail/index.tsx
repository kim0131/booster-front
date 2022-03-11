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
import useSWR, { mutate } from "swr";

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
  useEffect(() => {
    setTopicId(id);
    getTopicList();
  }, [category, id, router.query]);

  const { data: topic } = useSWR(`/api2/topic/list`, topicfetcher, {
    refreshInterval: 1000,
  });

  const { data, isValidating } = useSWR(
    `/api2/topic/list/${topicId}`,
    topicDetail,
    {
      onSuccess: (data, key, config) => {
        console.log(data);
        console.log(topicId);
        setTopicContent(undefined);
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
    },
  );

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

  const onClickRouter = (param: any) => {
    setTopicId(param);
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <>
      <SnbLayout>
        {!isValidating && (
          <>
            <Snb param={category} />
            <TopicContentLayout id={topicId} data={topicContent}>
              <Comment id={id} />
              {topicContent && (
                <Board
                  category={category}
                  Datas={boardDatas}
                  isLoading={isLoading}
                  onClick={onClickRouter}
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
