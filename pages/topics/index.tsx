import LnbLayout from "@components/layouts/lnb-layout";
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

const Topics: NextPage = () => {
  return (
    <LnbLayout>
      <Lnb lnbDatas={lnbDatas} param="menu1" />
    </LnbLayout>
  );
};

export default Topics;
