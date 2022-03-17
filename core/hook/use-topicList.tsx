import axios from "axios";
import { useSession } from "next-auth/react";
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

const topicfetcher = async (param: any) => {
  await onClickCategoryList();
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
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
        );

        result.push({
          rn: content.rn,
          id: content.idx,
          category: await getCategoryName(content.board),
          title: content.wr_subject,
          content: content.wr_content,
          writer: content.mb_name,
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

const topicfilterfetcher = async (param: any) => {
  const categoey = param.url.slice(17);
  const member_idx = param.idx;
  await onClickCategoryList();
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
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
        );

        const contentCategory = await getCategoryName(content.board);

        if (categoey == "스크랩") {
          if (content.scrap) {
            result.push({
              rn: content.rn,
              id: content.idx,
              category: contentCategory,
              title: content.wr_subject,
              content: content.wr_content,
              writer: content.mb_name,
              like: content.wr_good,
              view: content.wr_view,
              comments: content.commentCnt,
              board: content.board,
              bookmark: content.scrap, //추후필요
              create: elapsedTime,
              likeCnt: content.likeCnt,
            });
          }
        } else if (categoey == "내가 작성한 글") {
          if (content.mb_id == param.mb_id) {
            result.push({
              rn: content.rn,
              id: content.idx,
              category: contentCategory,
              title: content.wr_subject,
              content: content.wr_content,
              writer: content.mb_name,
              like: content.wr_good,
              view: content.wr_view,
              comments: content.commentCnt,
              board: content.board,
              bookmark: content.scrap, //추후필요
              create: elapsedTime,
              likeCnt: content.likeCnt,
            });
          }
        } else if (contentCategory == categoey) {
          result.push({
            rn: content.rn,
            id: content.idx,
            category: contentCategory,
            title: content.wr_subject,
            content: content.wr_content,
            writer: content.mb_name,
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

const useTopicList = () => {
  const { data: session }: any = useSession();
  const { data: topicList, mutate: topickListMutate } = useSWR(
    { url: "/api2/topic/list", idx: session?.user?.idx },
    topicfetcher,
    {
      refreshInterval: 5000,
    },
  );
  return { topicList, topickListMutate };
};

export const useTopicListFilter = (category: any) => {
  const { data: session }: any = useSession();
  const {
    data: topicListFilter,
    mutate,
    isValidating,
  } = useSWR(
    {
      url: `/api2/topic/list/${category}`,
      idx: session?.user?.idx,
      mb_id: session?.user?.email,
    },
    topicfilterfetcher,
    {
      refreshInterval: 5000,
    },
  );

  return { topicListFilter, isValidating };
};

export default useTopicList;
