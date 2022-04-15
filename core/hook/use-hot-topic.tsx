import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const hotTopicFetcher = async (param: any) => {
  const member_idx = param.idx;

  let result: any = [];
  const CurrentTime = new Date();
  await axios
    .post("/api2/topic/list", {
      member_idx: member_idx,
      sector: "topic",
    })
    .then(async res => {
      const topic = res.data.result;

      await topic.map(async (content: any, idx: any) => {
        let ContentTime = new Date(content.wr_datetime);
        ContentTime.setHours(ContentTime.getHours());
        const elapsedTime = Math.ceil(
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600 * 24),
        );
        const T = content.wr_subject.length;
        const V = content.wr_view;
        const L = content.likeCnt;
        const C = content.commentCnt;
        let hotPoint;
        if (elapsedTime < 7) {
          hotPoint = (elapsedTime + 7) * (T + V + C + L ** 2);
        } else {
          hotPoint = T + V + C + L ** 2;
        }
        result.push({
          id: content.idx,
          category: content.board_name,
          title: content.wr_subject,
          content: content.wr_content,
          writer: content.mb_name,
          view: content.wr_view,
          comments: content.commentCnt,
          board: content.board,
          bookmark: content.scrap, //추후필요
          create: elapsedTime,
          likeCnt: content.likeCnt,
          hotPoint: hotPoint,
        });
      });
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  result = result.sort(function (a: any, b: any) {
    return b.hotPoint - a.hotPoint;
  });
  return result.slice(0, 10);
};

export const useHotTopic = () => {
  const { data: session }: any = useSession();
  const { data: hotTopic } = useSWR(
    { url: "/api2/topic/hot", idx: session?.user?.idx },
    hotTopicFetcher,
  );

  return { hotTopic };
};
