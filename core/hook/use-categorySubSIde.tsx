/* eslint-disable react-hooks/rules-of-hooks */
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const CategorySnbMenufetcher = async (url: string) => {
  let result: any;
  const sector = url.slice(19);
  if (sector == "topic") {
    result = [
      {
        id: 1,
        category: "카테고리",
        menus: [
          {
            id: 900,
            content: "전체",
            param: "",
          },
          {
            id: 901,
            content: "인기글",
            param: "hot",
          },
        ],
      },
      {
        id: 2,
        category: "활동",
        menus: [
          {
            id: 1001,
            content: "스크랩",
            param: "scrap",
          },
          {
            id: 1002,
            content: "내가 작성한 글",
            param: "mywrite",
          },
        ],
      },
    ];
  } else if (sector == "insight") {
    result = [
      {
        id: 1,
        category: "카테고리",
        menus: [],
      },
    ];
  }

  await axios.get("/api2/category").then(res => {
    const Getcategory = res.data.result;
    Getcategory.map((item: any, idx: number) => {
      if (item.sector == sector) {
        result[0].menus.push({
          id: Getcategory[idx].idx,
          content: Getcategory[idx].bo_subject,
          param: Getcategory[idx].bo_table,
        });
      }
    });
  });
  return result;
};

const useCategorySubSide = (sector: string) => {
  const { data: categorySubSide } = useSWR(
    `/api2/category/sub/${sector}`,
    CategorySnbMenufetcher,
    { refreshInterval: 1000 },
  );

  return { categorySubSide };
};

export default useCategorySubSide;
