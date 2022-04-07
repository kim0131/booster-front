import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";

const sampleSearchSnbDatas = [
  {
    id: 0,
    category: "토픽",
    menus: [
      { id: 0, content: "전체 (100)", param: "menu1" },
      { id: 1, content: "메뉴 2 (50)", param: "menu2" },
      { id: 2, content: "메뉴 3 (50)", param: "menu3" },
    ],
  },
  {
    id: 0,
    category: "인사이트",
    menus: [
      { id: 0, content: "전체 (5)", param: "menu4" },
      { id: 1, content: "메뉴 5 (2)", param: "menu5" },
      { id: 2, content: "메뉴 6 (3)", param: "menu6" },
    ],
  },
];

const Search: NextPage = () => {
  const router = useRouter();
  return (
    <SnbLayout>
      <Snb category="menu1" snbDatas={sampleSearchSnbDatas} />
      <Board
        category="test"
        Datas={category == "인기글" ? hotTopic : topicListFilter}
        // onClickRouter={onClickRouter}
      />
    </SnbLayout>
  );
};

export default Search;
