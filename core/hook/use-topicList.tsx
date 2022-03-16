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

const topicfetcher = async (url: string) => {
  await onClickCategoryList();
  let result: any = [];
  const CurrentTime = new Date();
  await axios.get(url).then(async res => {
    const topic = res.data.result;
    topic.map(async (content: any, idx: any) => {
      let ContentTime = new Date(content.wr_datetime);
      ContentTime.setHours(ContentTime.getHours());
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      result.push({
        id: content.idx,
        category: await getCategoryName(content.board),
        title: content.wr_subject,
        content: content.wr_content,
        writer: content.mb_name,
        like: content.wr_good,
        view: content.wr_view,
        comments: content.commentCnt,
        board: content.board,
        bookmark: false, //추후필요
        create: elapsedTime,
        likeCnt: content.likeCnt,
      });
    });
  });
  return result;
};

const topicfilterfetcher = async (url: string) => {
  const categoey = url.slice(17);
  await onClickCategoryList();
  let result: any = [];
  const CurrentTime = new Date();
  await axios.get("/api2/topic/list").then(async res => {
    const topic = res.data.result;
    topic.map(async (content: any, idx: any) => {
      let ContentTime = new Date(content.wr_datetime);
      ContentTime.setHours(ContentTime.getHours());
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      const contentCategory = await getCategoryName(content.board);
      if (contentCategory == categoey) {
        result.push({
          id: content.idx,
          category: contentCategory,
          title: content.wr_subject,
          content: content.wr_content,
          writer: content.mb_name,
          like: content.wr_good,
          view: content.wr_view,
          comments: content.commentCnt,
          board: content.board,
          bookmark: false, //추후필요
          create: elapsedTime,
          likeCnt: content.likeCnt,
        });
      }
    });
  });
  return result;
};

const useTopicList = () => {
  const { data: topicList, mutate } = useSWR("/api2/topic/list", topicfetcher);
  return { topicList, mutate };
};

export const useTopicListFilter = (category: any) => {
  const {
    data: topicListFilter,
    mutate,
    isValidating,
  } = useSWR(`/api2/topic/list/${category}`, topicfilterfetcher);

  return { topicListFilter, isValidating };
};

export default useTopicList;
