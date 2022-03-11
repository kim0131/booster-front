import axios from "axios";

export const CategorySelectfetcher = async (url: string) => {
  let CategoryList: any = [];
  await axios.get("/api2/category").then(async res => {
    let list = res.data.result;
    list.map((item: any, idx: any) => {
      CategoryList.push({
        id: idx,
        value: list[idx].idx,
        content: list[idx].bo_subject,
      });
    });
  });

  return CategoryList;
};

export const CategorySnbMenufetcher = async (url: string) => {
  let result: any = [{ id: 1, category: "전체", menus: [] }];

  await axios.get("/api2/category").then(res => {
    const Getcategory = res.data.result;
    Getcategory.map((item: object, idx: number) => {
      result[0].menus.push({
        id: Getcategory[idx].idx,
        content: Getcategory[idx].bo_subject,
        param: Getcategory[idx].bo_table,
      });
    });
  });
  return result;
};
