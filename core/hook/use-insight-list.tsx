import { insightImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const insightfetcher = async (param: any) => {
  let result: any = [];

  await axios.get(param.url).then(async res => {
    const insightlist = res.data.result;
    const CurrentTime = new Date();
    await insightlist.map(async (item: any, idx: any) => {
      const ContentTime = new Date(item.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
      );
      let file_full_url = "";
      if (item.file_url) {
        file_full_url = insightImageUrl + item.file_url;
      }
      console.log(param.category, item.board_table);
      if (param.category != "all") {
        if (param.category == item.board_table) {
          result.push({
            idx: item.idx,
            category: item.board_name,
            wr_subject: item.wr_subject,
            mb_name: item.mb_nick,
            bo_table: item.board_table,
            datetime: item.wr_datetime.slice(0, 10),
            update: "",
            view: item.wr_view,
            like: item.likeCnt,
            comment: item.commentCnt,
            create: elapsedTime,
            file_full_url: file_full_url,
          });
        }
      } else {
        result.push({
          idx: item.idx,
          category: item.board_name,
          wr_subject: item.wr_subject,
          mb_name: item.mb_nick,
          bo_table: item.board_table,
          datetime: item.wr_datetime.slice(0, 10),
          update: "",
          view: item.wr_view,
          like: item.likeCnt,
          comment: item.commentCnt,
          create: elapsedTime,
          file_full_url: file_full_url,
        });
      }
    });
  });
  return result;
};
const useInsightList = (category?: string) => {
  const { data: insightList, mutate } = useSWR(
    { url: "/api2/insight/list", category: category ? category : "all" },
    insightfetcher,
  );
  return { insightList, mutate };
};

export default useInsightList;
