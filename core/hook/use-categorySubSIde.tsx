/* eslint-disable react-hooks/rules-of-hooks */
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const CategorySnbMenufetcher = async (url: string) => {
  let result: any = [{ id: 1, category: "전체", menus: [] }];
  const sector = url.slice(19);
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
  );

  return { categorySubSide };
};

export default useCategorySubSide;
