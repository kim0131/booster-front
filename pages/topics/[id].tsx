import LnbLayout from "@components/layouts/lnb-layout";
import TopicContentLayout from "@components/layouts/topic-content-layout";
import Board from "@components/templates/board";
import Comment from "@components/templates/comment";
import Lnb from "@components/templates/lnb";
import type { NextPage } from "next";

const lnbDatas = [
  {
    id: 0,
    category: "카테고리1",
    menus: [
      { id: 0, content: "메뉴1", param: "menu1" },
      { id: 1, content: "메뉴2", param: "menu2" },
      { id: 2, content: "메뉴3", param: "menu3" },
      { id: 3, content: "메뉴4", param: "menu4" },
    ],
  },
  {
    id: 1,
    category: "카테고리2",
    menus: [
      { id: 0, content: "메뉴5", param: "menu5" },
      { id: 1, content: "메뉴6", param: "menu6" },
      { id: 2, content: "메뉴7", param: "menu7" },
      { id: 3, content: "메뉴8", param: "menu8" },
    ],
  },
];

const TopicContent: NextPage = () => {
  return (
    <>
      <LnbLayout>
        {/* <Lnb lnbDatas={lnbDatas} param="menu4" />
        <TopicContentLayout>
          <Comment />
          <Board category="전체" />
        </TopicContentLayout> */}
      </LnbLayout>
    </>
  );
};

export default TopicContent;
