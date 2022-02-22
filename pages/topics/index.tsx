import LnbLayout from "@components/layouts/lnb-layout";
import Board from "@components/templates/board";
import Lnb from "@components/templates/lnb";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface IPropsLnb {
  lnbDatas: {
    id: number;
    category: string;
    menus: { id: number; content: string; param: string }[];
  }[];
  param: string | string[] | undefined;
}

interface Istate {
  lnbDatas: IPropsLnb;
  category: string | string[] | undefined;
}

const Topics: NextPage = () => {
  const router = useRouter();
  let Category = router.query.category;
  const [state, setState] = useState({
    lnbDatas: [
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
  const getCategory = async () => {
    let categoryList: any = [];
    let categoryIdx: number = 0;
    await axios.get("/api2/category").then(res => {
      const Getcategory = res.data.result;
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
      setState({
        ...state,
        lnbDatas: [{ id: 1, category: "전체", menus: categoryList }],
        category: Getcategory[categoryIdx].bo_subject,
      });
    });
  };
  return (
    <>
      <LnbLayout>
        <Lnb lnbDatas={state.lnbDatas} param={state.category} />
        <Board category={state.category} />
      </LnbLayout>
    </>
  );
};

export default Topics;
