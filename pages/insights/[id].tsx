import InsightsContentLayout from "@components/layouts/insights-content-layout";
import LnbLayout from "@components/layouts/lnb-layout";
import Comment from "@components/templates/comment";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const InsightId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    lnbDatas: [
      { id: 0, content: "전체", param: "all" },
      { id: 1, content: "메뉴1", param: "menu1" },
      { id: 2, content: "메뉴2", param: "menu2" },
    ],
  });
  console.log(id);
  return (
    <InsightsContentLayout
    // comments={<Comment />}
    >
      <LnbLayout>
        <Lnb lnbDatas={state.lnbDatas} param="전체" />
        <Post />
      </LnbLayout>
    </InsightsContentLayout>
  );
};

export default InsightId;
