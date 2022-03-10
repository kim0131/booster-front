/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@components/elements/loader";
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Comment from "@components/templates/comment";
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

interface Istate {
  snbDatas: any;
  category: string | string[] | undefined;
}
const TopicDetail: NextPage = () => {
  const router = useRouter();
  let Category = router.query.category;
  let { id } = router.query;
  const { data: topic } = useSWR(`/api2/topic/list`, Topicfetcher);
  const { data: categoryList } = useSWR(
    `/api2/category`,
    CategorySelectfetcher,
  );
  const [isLoading, setLoading] = useState<any>();
  const [commentCount, setCount] = useState();
  const [categoryContainer, setCategoryContainer] = useState<any>([]);

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
  const [state, setState] = useState<Istate>({
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
    if (id) {
      getCategory();
      getTopiceContent();
      getCount(id);
    }
  }, [id, state.category]);

  const getCategory = async () => {
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
          category: Category,
        });
      } else {
        setState({
          ...state,
          snbDatas: [{ id: 1, category: "전체", menus: categoryList }],
          category: Category,
        });
      }
    });
  };

  const getCount = async (id: any) => {
    const res = await axios.get(`/api2/topic/commentcount/${id}`);
    setCount(res.data.result.length);
  };

  const getTopiceContent = async () => {
    setLoading(true);
    if (categoryContainer) {
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
        {isLoading ? (
          <Loader color="gray" />
        ) : (
          <TopicContentLayout id={id} count={commentCount}>
            <Comment id={id} count={commentCount} />
            {boardDatas && (
              <Board
                category={state.category}
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
