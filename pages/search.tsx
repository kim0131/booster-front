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
    id: 1,
    category: "인사이트",
    menus: [
      { id: 0, content: "전체 (5)", param: "menu4" },
      { id: 1, content: "메뉴 5 (2)", param: "menu5" },
      { id: 2, content: "메뉴 6 (3)", param: "menu6" },
    ],
  },
];

const sampleSearchResult = [
  {
    rn: 1,
    id: 155,
    category: "미용",
    title: "123",
    content: "123",
    writer: "부스터관리자",
    like: 0,
    view: 6,
    comments: 0,
    board: 37,
    bookmark: false,
    create: 1372,
    likeCnt: 0,
  },
  {
    rn: 2,
    id: 145,
    category: "미용",
    title: "123",
    content: "4124123",
    writer: "부스터관리자",
    like: 0,
    view: 3,
    comments: 0,
    board: 37,
    bookmark: false,
    create: 1626,
    likeCnt: 0,
  },
  {
    rn: 3,
    id: 139,
    category: "미용",
    title: "123",
    content: "124124",
    writer: "부스터관리자",
    like: 0,
    view: 0,
    comments: 0,
    board: 37,
    bookmark: false,
    create: 1657,
    likeCnt: 0,
  },
  {
    rn: 4,
    id: 130,
    category: "데이터하이브",
    title: "321",
    content: "321",
    writer: null,
    like: 0,
    view: 0,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 2766,
    likeCnt: 0,
  },
  {
    rn: 5,
    id: 129,
    category: "데이터하이브",
    title: "123",
    content: "123",
    writer: null,
    like: 0,
    view: 1,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 2767,
    likeCnt: 0,
  },
  {
    rn: 6,
    id: 128,
    category: "데이터하이브",
    title: "213",
    content: "123",
    writer: null,
    like: 0,
    view: 0,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 2772,
    likeCnt: 0,
  },
  {
    rn: 7,
    id: 127,
    category: "데이터하이브",
    title: "123",
    content: "123",
    writer: null,
    like: 0,
    view: 0,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 2773,
    likeCnt: 0,
  },
  {
    rn: 8,
    id: 126,
    category: "데이터하이브",
    title: "123",
    content: "123",
    writer: null,
    like: 0,
    view: 0,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 2777,
    likeCnt: 0,
  },
  {
    rn: 9,
    id: 24,
    category: "미용",
    title: "qweqwe",
    content: "112",
    writer: "부스터관리자",
    like: 0,
    view: 4,
    comments: 0,
    board: 37,
    bookmark: false,
    create: 59093,
    likeCnt: 0,
  },
  {
    rn: 10,
    id: 21,
    category: "부동산",
    title: "분양가 잡겠다고 했지만…시세·분양가 격차 사상 최대 부동산R114 분석",
    content:
      "전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.전국 아파트 매매가격과 분양가격 격차가 사상 최대 규모로 벌어진 것으로 나타났다.",
    writer: "부스터관리자",
    like: 0,
    view: 8,
    comments: 1,
    board: 38,
    bookmark: false,
    create: 60371,
    likeCnt: 0,
  },
  {
    rn: 11,
    id: 7,
    category: "데이터하이브",
    title: "데이터하이브 21일 점심",
    content: "육대장에서\n\n육개장 2개\n\n부대육개장 2개",
    writer: "부스터관리자",
    like: 0,
    view: 9,
    comments: 0,
    board: 10,
    bookmark: false,
    create: 69024,
    likeCnt: 0,
  },
  {
    rn: 12,
    id: 4,
    category: "데이터하이브",
    title: "오늘 청소 언제하나요?",
    content: "제곧내",
    writer: "부스터관리자",
    like: 0,
    view: 3,
    comments: 3,
    board: 10,
    bookmark: false,
    create: 69054,
    likeCnt: 0,
  },
  {
    rn: 13,
    id: 3,
    category: "코인",
    title: "주식보단 코인이지!!!",
    content: "코인 가즈아!!!!",
    writer: "부스터관리자",
    like: 0,
    view: 3,
    comments: 0,
    board: 6,
    bookmark: false,
    create: 69103,
    likeCnt: 0,
  },
  {
    rn: 14,
    id: 1,
    category: "주식",
    title: "주식 오늘 실화",
    content: "오늘 변동성 장난아니네\n\n\n!!",
    writer: "부스터관리자",
    like: 0,
    view: 1,
    comments: 0,
    board: 1,
    bookmark: false,
    create: 70870,
    likeCnt: 0,
  },
];

const Search: NextPage = () => {
  const router = useRouter();

  const onClickRouter = (param: any) => {
    router.push(`/topics/detail?id=${param}`);
  };

  return (
    <SnbLayout>
      <Snb category="menu1" snbDatas={sampleSearchSnbDatas} />
      <Board
        category="test"
        title={sampleSearchSnbDatas[0].menus[0].content}
        datas={sampleSearchResult}
        onClickRouter={onClickRouter}
      />
    </SnbLayout>
  );
};

export default Search;
