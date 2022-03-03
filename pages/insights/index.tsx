import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import type { NextPage } from "next";
import { useState } from "react";

const Insights: NextPage = () => {
  const [state, setState] = useState({
    lnbDatas: [
      { id: 0, content: "전체", param: "all" },
      { id: 1, content: "메뉴1", param: "menu1" },
      { id: 2, content: "메뉴2", param: "menu2" },
    ],
  });
  return (
    <LnbLayout>
      <Lnb lnbDatas={state.lnbDatas} param="전체" />
      <Post />
    </LnbLayout>
  );
};

export default Insights;
