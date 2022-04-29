/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useSWR from "swr";

const categorySnbMenuFetcher = async (url: string) => {
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
            param: "all",
          },
          {
            id: 901,
            content: "인기글",
            param: "hot",
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

  await axios
    .get("/api2/category")
    .then(res => {
      const Getcategory = res.data.result;
      Getcategory.map((item: any, idx: number) => {
        if (item.sector == sector) {
          result[0].menus.push({
            id: Getcategory[idx].idx,
            content: Getcategory[idx].bo_subject,
            param: Getcategory[idx].bo_table,
            priority: Getcategory[idx].priority,
          });
        }
      });
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  result[0].menus = result[0].menus.sort(function (a: any, b: any) {
    return a.priority - b.priority;
  });

  return result;
};

export const useCategorySubSide = (sector: string) => {
  const { data: categorySubSide, isValidating: isCategorySubSideValidating } =
    useSWR(`/api2/category/sub/${sector}`, categorySnbMenuFetcher);
  return { categorySubSide, isCategorySubSideValidating };
};
