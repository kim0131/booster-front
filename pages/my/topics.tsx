/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";
import { useEffect, useState } from "react";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import useHistoryState from "@core/hook/use-history-state";

const MyTopics: NextPage = () => {
  const router = useRouter();

  const { topicListFilter } = useTopicListFilter("my");
  const [category, setCategory] = useHistoryState("all", "category");
  const [topiceList, setTopiceList] = useState([
    {
      id: 0,
      idx: 0,
      category: "",
      title: "",
      content: "",
      writer: "",
      like: 0,
      view: 0,
      comments: 0,
      bookmark: false,
      create: 0,
      likeCnt: 0,
      rn: 0,
    },
  ]);
  const [snbDatas, setSnbDatas] = useState([
    {
      id: 0,
      category: "스크랩",
      menus: [{ id: 0, content: "전체 (0)", param: "menu1" }],
    },
  ]);

  useEffect(() => {
    setSnbData();
  }, [topicListFilter]);

  useEffect(() => {
    filterTopiceList();
  }, [category, topicListFilter]);

  const onClickRouter = (param: any) => {
    if (param.sector == "topics") {
      router.push(`/${param.sector}/detail/${param.idx}?category=${category}`);
    } else {
      router.push(`/${param.sector}/${param.idx}`);
    }
  };

  const setSnbData = () => {
    if (topicListFilter) {
      const list = [
        {
          id: 0,
          category: "작성글",
          menus: [
            {
              id: 0,
              content: `전체 (${topicListFilter.length})`,
              param: "all",
              count: topicListFilter.length,
              name: "전체",
            },
          ],
        },
      ];
      topicListFilter.map((data: any, idx: any) => {
        topicListFilter[idx].sector = "topics";
        let categoeryList: any = [];
        list[0].menus.map((menu: any) => {
          if (categoeryList.indexOf(menu.param) == -1) {
            categoeryList.push(menu.param);
          }
        });

        const index = categoeryList.indexOf(data.bo_table);
        if (categoeryList.indexOf(data.bo_table) == -1) {
          list[0].menus.push({
            id: categoeryList.length,
            content: data.category + " (" + 1 + ")",
            param: data.bo_table,
            name: data.category,
            count: 1,
          });
        } else {
          list[0].menus[index].count = list[0].menus[index].count + 1;
          list[0].menus[
            index
          ].content = `${list[0].menus[index].name} (${list[0].menus[index].count})`;
        }
      });
      setSnbDatas(list);
    }
  };

  const filterTopiceList = () => {
    if (topicListFilter) {
      const result = topicListFilter.filter((data: any) => {
        if (category == "all") {
          return true;
        } else {
          return category == data.bo_table;
        }
      });
      setTopiceList(result);
    }
  };

  return (
    <SnbLayout>
      {topicListFilter && (
        <>
          <Snb
            category={category ? category : "all"}
            snbDatas={snbDatas}
            setCategory={setCategory}
          />

          <Board
            category={category ? category : "all"}
            title={"작성글"}
            datas={category ? topiceList : topicListFilter}
            onClickRouter={onClickRouter}
          />
        </>
      )}
    </SnbLayout>
  );
};

export default MyTopics;
