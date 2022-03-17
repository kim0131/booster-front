import { topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
import { useSession } from "next-auth/react";
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

const topicDetailfetcher = async (param: any) => {
  await onClickCategoryList();
  const member_idx = param.idx;
  let topicList: any = {};
  await axios
    .post(param.url, {
      member_idx: member_idx,
      sector: "topic",
    })
    .then(async res => {
      const TopicContent = res.data.result[0];
      const CurrentTime = new Date();
      const ContentTime = new Date(TopicContent.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      if (TopicContent.file_url) {
        TopicContent.file_full_url =
          (await topicImageUrl) + TopicContent.file_url.slice(2, -2);
      }
      TopicContent.category = await getCategoryName(TopicContent.board);
      TopicContent.bookmark = TopicContent.scrap; //추후필요
      TopicContent.create = await elapsedTime;
      topicList = TopicContent;
    });
  return topicList;
};

export const useTopicDetail = (id: any) => {
  const { data: session }: any = useSession();
  const { data: topicDetail, mutate } = useSWR(
    { url: `/api2/topic/detail/${id}`, idx: session?.user?.idx },
    topicDetailfetcher,
  );
  return { topicDetail, mutate };
};
