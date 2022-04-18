import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const searchFetcher = async (param: any) => {
  let result: any = [];
  const category = param.category ? param.category : "all";
  if (param.idx) {
    await axios
      .post("/api2/home/search", {
        search_value: param.seachValue,
        member_idx: param.idx,
      })
      .then(async res => {
        const topicResult: any = res.data.result;
        const topicCnt = res.data.topicCnt;
        const insightResult: any = res.data.insightResult;
        const insightCnt = res.data.insightCnt;
        topicResult.map((data: any, idx: any) => {
          topicResult[idx] = {
            ...topicResult[idx],
            sector: "topics",
          };
        });
        insightResult.map((data: any, idx: any) => {
          insightResult[idx] = {
            ...insightResult[idx],
            sector: "insights",
          };
        });

        const SearchSnbDatas = [
          {
            id: 0,
            category: "전체",
            menus: [
              {
                id: 0,
                content: `전체 (${topicResult.length + insightResult.length})`,
                param: "all",
                name: "전체",
              },
            ],
          },
          {
            id: 1,
            category: "토픽",
            menus: [],
          },
          {
            id: 2,
            category: "인사이트",
            menus: [],
          },
        ];

        await topicCnt.map((data: any, idx: any) => {
          if (data.toCnt > 0) {
            SearchSnbDatas[1].menus.push({
              id: data.idx,
              content: data.bo_subject + " (" + data.toCnt + ")",
              param: data.bo_table,
              name: data.bo_subject,
            });
          }
        });

        await insightCnt.map((data: any, idx: any) => {
          if (data.inCnt) {
            SearchSnbDatas[2].menus.push({
              id: data.idx,
              content: data.bo_subject + " (" + data.inCnt + ")",
              param: data.bo_table,
              name: data.bo_subject,
            });
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

        const result2 = BoardList.filter((data: any) => {
          if (category == "all") {
            return true;
          } else {
            return category == data.bo_table;
          }
        });

        result.push({
          SearchSnbDatas: SearchSnbDatas,
          result: result2,
        });
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  }
  return result[0];
};

export const useSearch = (
  seachValue: string | string[] | undefined,
  category?: string | string[] | undefined,
) => {
  const { data: session }: any = useSession();
  const { data: searchResult } = useSWR(
    {
      url: `/api2/home/search`,
      seachValue: seachValue,
      idx: session?.user?.idx,
      category: category,
    },
    searchFetcher,
  );
  return { searchResult };
};
