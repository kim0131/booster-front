/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getPriority } from "os";
import useSWR from "swr";
import { topicfilterfetcher } from "./use-topic-list";

const categoryFetcher = async (url: string) => {
  let result: any = [];
  await axios
    .get("/api2/category")
    .then((res: any) => {
      const list = res.data.result;
      list.map((item: any, idx: any) => {
        if (!list[idx].wr_view) {
          list[idx].wr_view = 0;
        }
        if (!list[idx].wr_good) {
          list[idx].wr_good = 0;
        }
        result.push({
          idx: list[idx].idx,
          bo_table: list[idx].bo_table,
          bo_subject: list[idx].bo_subject,
          num_board: list[idx].board,
          num_view: list[idx].wr_view,
          num_good: list[idx].wr_good,
          sector: list[idx].sector,
          edit_subject: "수정 및 삭제하기",
        });
      });
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  return result;
};

const categoryHomeFetcher = async (url: string) => {
  let filterresult: any = [];
  await axios
    .get("/api2/category")
    .then(async (res: any) => {
      const list = res.data.result;

      
      for (const item of list) {
        if (!item.wr_view) {
          item.wr_view = 0;
        }
        if (!item.wr_good) {
          item.wr_good = 0;
        }
        if (item.sector == "topic") {
          await topicfilterfetcher({
            url: `/api2/topic/list/${item.bo_table}`,
          })
          .then(res => {
            if (res.length > 0)
            filterresult.push({
              idx: item.idx,
              bo_table: item.bo_table,
              bo_subject: item.bo_subject,
              num_board: item.board,
              num_view: item.wr_view,
              num_good: item.wr_good,
              sector: item.sector,
              edit_subject: "수정 및 삭제하기",
              contents: res.slice(0, 5),
              priority:item.priority,
              open:item.open,
            });
          })
            .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
          }
        }
       filterresult = filterresult.sort((a: any, b: any) => {
        return a.priority - b.priority;
      });
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return filterresult;
};

const useCategoryList = () => {
  const { data: categoryList } = useSWR(`/api2/category/list`, categoryFetcher,{},);
  return { categoryList };
};
export default useCategoryList;


export const useCategoryListHome = () => {
  const { data: categoryListHome } = useSWR(
    `/api2/category/list/home`,
    categoryHomeFetcher,
    {},
  );
  return { categoryListHome };
};

