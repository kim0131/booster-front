/* eslint-disable react-hooks/exhaustive-deps */
import SnbLayout from "@components/layouts/snb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Comment from "@components/templates/comment";
import Snb from "@components/templates/snb";
import axios from "axios";
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

interface Istate {
  snbDatas: any;
  category: string | string[] | undefined;
}
const TopicContent: NextPage = () => {
  const router = useRouter();
  let Category = router.query.category;
  let id = router.query.id;
  const [commentCount, setCount] = useState();
  const [categoryContainer, setCategoryContainer] = useState<any>([]);
  const [topicContent, setTopicContent] = useState();
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
  }, [router, id, state.category]);

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

  const getCategoryName = (idx: any) => {
    for (let i = 0; i < categoryContainer.length; i++) {
      if (categoryContainer[i].idx == idx) {
        return categoryContainer[i].bo_subject;
      }
    }
  };

  const getTopiceContent = async () => {
    if (categoryContainer) {
      await axios("/api2/topic/list").then(res => {
        const TopicContent = res.data.result;
        const CurrentTime = new Date();
        const result = TopicContent.filter((content: any) => {
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
          content.comments = 0;
          content.bookmark = false; //추후필요
          content.create = elapsedTime;
          content.replycount = res.data.result.length;
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

        setBoardDatas(result);
      });
    } else {
      getTopiceContent();
    }
  };

  return (
    <>
      <SnbLayout>
        <Snb snbDatas={state.snbDatas} param={state.category} />
        <TopicContentLayout id={id} count={commentCount}>
          <Comment id={id} count={commentCount} />
          <Board category={state.category} Datas={boardDatas} />
        </TopicContentLayout>
      </SnbLayout>
    </>
  );
};

export default TopicContent;
