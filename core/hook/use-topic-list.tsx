import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const topicfetcher = async (param: any) => {
  let result: any = [];
  const member_idx: number = param.idx;
  const CurrentTime = new Date();
  await axios
    .post("/api2/topic/list", {
      member_idx: member_idx,
      sector: "topic",
    })
    .then(async res => {
      const topic = res.data.result;

      for (const content of topic) {
        let ContentTime = new Date(content.wr_datetime);
        ContentTime.setHours(ContentTime.getHours());
        const elapsedTime = Math.ceil(
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
        );

        result.push({
          rn: content.rn,
          id: content.idx,
          category: content.board_name,
          title: content.wr_subject,
          content: content.wr_content,
          writer: content.mb_nick,
          like: content.wr_good,
          view: content.wr_view,
          comments: content.commentCnt,
          board: content.board,
          bookmark: content.scrap, //추후필요
          create: elapsedTime,
          likeCnt: content.likeCnt,
        });
      }
    });
  return result;
};

export const topicfilterfetcher = async (param: any) => {
  const category = param.url.slice(17);
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
      for (const content of topic) {
        let ContentTime = new Date(content.wr_datetime);
        ContentTime.setHours(ContentTime.getHours());
        const elapsedTime = Math.ceil(
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
        );

        if (category == "" || category == "전체") {
          result.push({
            rn: content.rn,
            id: content.idx,
            category: content.board_name,
            title: content.wr_subject,
            content: content.wr_content,
            writer: content.mb_nick,
            like: content.wr_good,
            view: content.wr_view,
            comments: content.commentCnt,
            board: content.board,
            bookmark: content.scrap, //추후필요
            create: elapsedTime,
            likeCnt: content.likeCnt,
          });
        } else if (category == "스크랩") {
          if (content.scrap) {
            result.push({
              rn: content.rn,
              id: content.idx,
              category: content.board_name,
              title: content.wr_subject,
              content: content.wr_content,
              writer: content.mb_nick,
              like: content.wr_good,
              view: content.wr_view,
              comments: content.commentCnt,
              board: content.board,
              bookmark: content.scrap, //추후필요
              create: elapsedTime,
              likeCnt: content.likeCnt,
            });
          }
        } else if (category == "내가 작성한 글") {
          if (content.mb_id == param.mb_id) {
            result.push({
              rn: content.rn,
              id: content.idx,
              category: content.board_name,
              title: content.wr_subject,
              content: content.wr_content,
              writer: content.mb_nick,
              like: content.wr_good,
              view: content.wr_view,
              comments: content.commentCnt,
              board: content.board,
              bookmark: content.scrap, //추후필요
              create: elapsedTime,
              likeCnt: content.likeCnt,
            });
          }
        } else if (content.board_name == category) {
          result.push({
            rn: content.rn,
            id: content.idx,
            category: content.board_name,
            title: content.wr_subject,
            content: content.wr_content,
            writer: content.mb_nick,
            like: content.wr_good,
            view: content.wr_view,
            comments: content.commentCnt,
            board: content.board,
            bookmark: content.scrap, //추후필요
            create: elapsedTime,
            likeCnt: content.likeCnt,
          });
        }
      }
    });
  return result;
};

export const useTopicList = () => {
  const { data: session }: any = useSession();
  const { data: topicList, mutate: topickListMutate } = useSWR(
    { url: "/api2/topic/list", idx: session?.user?.idx },
    topicfetcher,
  );
  return { topicList, topickListMutate };
};

export const useTopicListFilter = (category: any) => {
  const { data: session }: any = useSession();
  const {
    data: topicListFilter,

    isValidating,
  } = useSWR(
    {
      url: `/api2/topic/list/${category}`,
      idx: session?.user?.idx,
      mb_id: session?.user?.email,
    },
    topicfilterfetcher,
  );

  return { topicListFilter, isValidating };
};
