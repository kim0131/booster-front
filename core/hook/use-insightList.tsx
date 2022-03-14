import { insightImageUrl } from "@core/config/imgurl";
import axios from "axios";
import { useCallback, useEffect } from "react";
import useSWR from "swr";

let category: any = [];

const onClickCategoryList = async () => {
  await axios.get("/api2/category").then((res: any) => {
    let list = res.data.result;
    list.map((item: any, idx: any) => {
      category.push({
        value: list[idx].idx,
        label: list[idx].bo_subject,
      });
    });
  });
};
const getCategoryName = (idx: any) => {
  for (let i = 0; i < category.length; i++) {
    if (category[i].value == idx) {
      return category[i].label;
    }
  }
};

const insightfetcher = async (url: string) => {
  await onClickCategoryList();
  let result: any = [];
  await axios.get(url).then(async res => {
    const insightlist = res.data.result;
    const CurrentTime = new Date();
    await insightlist.map(async (item: any, idx: any) => {
      const ContentTime = new Date(item.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      let file_full_url = "";
      if (item.file_url) {
        file_full_url = insightImageUrl + item.file_url.slice(2, -2);
      }
      result.push({
        idx: item.idx,
        category: await getCategoryName(item.board),
        wr_subject: item.wr_subject,
        mb_name: item.mb_name,
        datetime: item.wr_datetime.slice(0, 10),
        update: "",
        view: item.wr_view,
        like: item.likeCnt,
        comment: item.commentCnt,
        create: elapsedTime,
        file_full_url: file_full_url,
      });
    });
  });
  return result;
};
const useInsightList = () => {
  const { data: insightList, mutate } = useSWR(
    "/api2/insight/list",
    insightfetcher,
  );
  return { insightList, mutate };
};

export default useInsightList;
