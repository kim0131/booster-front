import LnbLayout from "@components/layouts/lnb-layout";
import Board from "@components/templates/board";
import Lnb from "@components/templates/lnb";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Topics: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    lnbDatas: [
      {
        id: 0,
        category: "카테고리1",
        menus: [{ id: 0, content: "메뉴1", param: "menu1" }],
      },
    ],
  });

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  const getCategory = async () => {
    let categoryList: any = [];
    await axios.get("/api2/category").then(res => {
      const category = res.data.result;
      category.map((item: object, idx: number) => {
        categoryList.push({
          id: category[idx].idx,
          content: category[idx].bo_subject,
          param: category[idx].bo_table,
        });
      });
      setState({
        ...state,
        lnbDatas: [{ id: 1, category: "전체", menus: categoryList }],
      });
    });
  };
  return (
    <>
      <LnbLayout>
        <Lnb lnbDatas={state.lnbDatas} param="menu4" />
        <Board />
      </LnbLayout>
    </>
  );
};

export default Topics;
