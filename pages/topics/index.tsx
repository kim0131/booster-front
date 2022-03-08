import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
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

interface Istate {
  snbDatas: IPropsSnb;
  category: string | string[] | undefined;
}

const Topics: NextPage = () => {
  const router = useRouter();
  const { data: topic } = useSWR(`/api2/topic/list`, Topicfetcher);
  let Category = router.query.category;
  const [categoryContainer, setCategoryContainer] = useState<any>([]);
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
  const [state, setState] = useState({
    snbDatas: [
      {
        id: 0,
        category: "카테고리1",
        menus: [{ id: 0, content: "메뉴1", param: "menu1" }],
      },
    ],
    category: "",
  });
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  useEffect(() => {
    if (topic) {
      getTopiceContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.category, topic]);

  const getCategory = async () => {
    setLoading(true);
    let categoryList: any = [];
    let categoryIdx: number = 0;
    await axios.get("/api2/category").then(res => {
      const Getcategory = res.data.result;
      setCategoryContainer(Getcategory);
      Getcategory.map((item: object, idx: number) => {
        categoryList.push({
          id: Getcategory[idx].idx,
          content: Getcategory[idx].bo_subject,
          param: Getcategory[idx].bo_table,
        });

        if (Getcategory[idx].bo_table == Category) {
          categoryIdx = idx;
        }
      });
      if (Category) {
        setState({
          ...state,
          snbDatas: [{ id: 1, category: "전체", menus: categoryList }],
          category: Getcategory[categoryIdx].bo_subject,
        });
      } else {
        setState({
          ...state,
          snbDatas: [{ id: 1, category: "전체", menus: categoryList }],
          category: "토픽 전체",
        });
      }
    });
    setLoading(false);
  };

  const getCategoryName = (idx: any) => {
    for (let i = 0; i < categoryContainer.length; i++) {
      if (categoryContainer[i].idx == idx) {
        return categoryContainer[i].bo_subject;
      }
    }
  };

  const getTopiceContent = async () => {
    setLoading(true);

    if (categoryContainer.length) {
      let result = topic.filter((content: any) => {
        if (Category) {
          return content.category == state.category;
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
        <Snb snbDatas={state.snbDatas} param={state.category} />
        {boardDatas && (
          <Board
            category={state.category}
            Datas={boardDatas}
            isLoading={isLoading}
          />
        )}
      </SnbLayout>
    </>
  );
};

export default Topics;
