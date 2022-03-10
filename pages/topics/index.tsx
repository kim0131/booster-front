import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";
import { Topicfetcher } from "@core/swr/topicfetch";
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

const Topics: NextPage = () => {
  const router = useRouter();
  const { data: topic } = useSWR(`/api2/topic/list`, Topicfetcher);
  let Category = router.query.category;
  const { data: categoryContainer } = useSWR(
    "/api2/category",
    CategorySelectfetcher,
  );
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
    if (topic) {
      getTopiceContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Category, topic]);

  const getTopiceContent = async () => {
    setLoading(true);
    if (categoryContainer.length) {
      let result = topic.filter((content: any) => {
        if (Category) {
          return content.category == Category;
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
    setLoading(false);
  };

  return (
    <>
      <SnbLayout>
        <Snb param={Category} />
        {boardDatas && (
          <Board category={Category} Datas={boardDatas} isLoading={isLoading} />
        )}
      </SnbLayout>
    </>
  );
};

export default Topics;
