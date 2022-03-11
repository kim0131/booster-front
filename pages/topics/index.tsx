/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";
import { topicfetcher } from "@core/swr/topicfetch";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Topics: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
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
  const { data: topic, isValidating } = useSWR(
    `/api2/topic/list`,
    topicfetcher,
    {
      refreshInterval: 1000,
      onSuccess: (data, key, config) => {
        if (data) {
          let result = data.filter((content: any) => {
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
          setBoardDatas(data);
        }
      },
    },
  );
  useEffect(() => {
    getTopicList();
  }, [category, router]);

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
        <Snb param={category} />
        {boardDatas && (
          <Board category={category} Datas={boardDatas} isLoading={false} />
        )}
      </SnbLayout>
    </>
  );
};

export default Topics;
