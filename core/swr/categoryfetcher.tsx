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
