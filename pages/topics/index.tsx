import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import TopicContent from "./[id]";
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
    getTopiceContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.category]);

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
    if (categoryContainer) {
      await axios("/api2/topic/list").then(res => {
        const TopicContent = res.data.result;

        const CurrentTime = new Date();
        let result = TopicContent.filter((content: any) => {
          const ContentTime = new Date(content.wr_datetime);
          const elapsedTime = Math.ceil(
            (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
          );
          content.id = content.idx;
          content.category = getCategoryName(content.board);
          content.title = content.wr_subject;
          content.content = content.wr_content;
          content.writer = content.mb_name;
          content.like = content.wr_good;
          content.view = content.wr_view;
          content.comments = 50; // 추후 필요
          content.bookmark = false; //추후필요
          content.create = elapsedTime;
          delete content.idx;
          delete content.board;
          delete content.mb_email;
          delete content.mb_id;
          delete content.mb_name;
          delete content.wr_content;
          delete content.wr_datetime;
          delete content.wr_good;
          delete content.wr_ip;
          delete content.wr_is_comment;
          delete content.wr_is_comment2;
          delete content.wr_parent;
          delete content.wr_subject;
          delete content.wr_update;
          delete content.wr_view;
          delete content.file_url;
          if (Category) {
            return content.category == state.category;
          } else {
            return true;
          }
        });

        if (result) {
          setBoardDatas(result);
        }
      });
    } else {
      getTopiceContent();
    }
    setLoading(false);
  };

  return (
    <>
      <SnbLayout>
        <Snb snbDatas={state.snbDatas} param={state.category} />
        <Board
          category={state.category}
          Datas={boardDatas}
          isLoading={isLoading}
        />
      </SnbLayout>
    </>
  );
};

export default Topics;
