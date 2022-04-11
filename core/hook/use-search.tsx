import Board from "@components/templates/board";
import axios from "axios";
import useSWR from "swr";

const searchFetcher = async (param: any) => {
  let result: any = [];
  await axios
    .post("/api2/home/search", { search_value: param.seachValue })
    .then(async res => {
      const topicResult = res.data.result;
      const insightResult = res.data.insightResult;
      const SearchSnbDatas = [
        {
          id: 0,
          category: "토픽",
          menus: [
            {
              id: 0,
              content: `전체 (${topicResult.length})`,
              param: "all",
              count: topicResult.length,
              name: "전체",
            },
          ],
        },
        {
          id: 1,
          category: "인사이트",
          menus: [
            {
              id: 0,
              content: `전체 (${insightResult.length})`,
              param: "all",
              count: insightResult.length,
              name: "전체",
            },
          ],
        },
      ];

      await topicResult.map((data: any, idx: any) => {
        topicResult[idx].sector = "topics";
        let categoeryList: any = [];
        SearchSnbDatas[0].menus.map((menu: any) => {
          if (categoeryList.indexOf(menu.param) == -1) {
            categoeryList.push(menu.param);
          }
        });
        const index = categoeryList.indexOf(data.bo_table);
        if (categoeryList.indexOf(data.bo_table) == -1) {
          SearchSnbDatas[0].menus.push({
            id: categoeryList.length,
            content: data.bo_subject + " (" + 1 + ")",
            param: data.bo_table,
            name: data.bo_subject,
            count: 1,
          });
        } else {
          SearchSnbDatas[0].menus[index].count =
            SearchSnbDatas[0].menus[index].count + 1;
          SearchSnbDatas[0].menus[
            index
          ].content = `${SearchSnbDatas[0].menus[index].name} (${SearchSnbDatas[0].menus[index].count})`;
        }
      });

      await insightResult.map((data: any, idx: any) => {
        insightResult[idx].sector = "insights";
        let categoeryList: any = [];
        SearchSnbDatas[1].menus.map((menu: any) => {
          if (categoeryList.indexOf(menu.param) == -1) {
            categoeryList.push(menu.param);
          }
        });

        const index = categoeryList.indexOf(data.bo_table);
        if (categoeryList.indexOf(data.bo_table) == -1) {
          SearchSnbDatas[1].menus.push({
            id: categoeryList.length,
            content: data.bo_subject + " (" + 1 + ")",
            param: data.bo_table,
            name: data.bo_subject,
            count: 1,
          });
        } else {
          SearchSnbDatas[1].menus[index].count =
            SearchSnbDatas[1].menus[index].count + 1;

          SearchSnbDatas[1].menus[
            index
          ].content = `${SearchSnbDatas[1].menus[index].name} (${SearchSnbDatas[1].menus[index].count})`;
        }
      });
      let BoardList = topicResult
        .concat(insightResult)
        .sort(function (a: any, b: any) {
          const a_time = new Date(a.wr_datetime).getTime();
          const b_time = new Date(b.wr_datetime).getTime();

          return b_time - a_time;
        });

      BoardList.map((data: any, idx: any) => {
        const CurrentTime = new Date();
        let ContentTime = new Date(data.wr_datetime);
        ContentTime.setHours(ContentTime.getHours());
        const elapsedTime = Math.ceil(
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
        );
        BoardList[idx] = {
          id: idx,
          idx: data.idx,
          category: data.bo_subject,
          title: data.wr_subject,
          content: data.wr_content,
          writer: data.mb_nick,
          like: data.wr_good,
          view: data.totalCnt,
          comments: data.commentCnt,
          board: data.board,
          bookmark: data.scrap, //추후필요
          create: elapsedTime,
          likeCnt: data.likeCnt,
          sector: data.sector,
          bo_table: data.bo_table,
        };
      });
      result.push({
        SearchSnbDatas: SearchSnbDatas,
        result: BoardList,
      });
    });
  return result[0];
};

export const useSearch = (seachValue: string | string[] | undefined) => {
  const { data: searchResult } = useSWR(
    {
      url: `/api2/home/search`,
      seachValue: seachValue,
    },
    searchFetcher,
  );
  return { searchResult };
};
