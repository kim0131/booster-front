import { topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const topicDetailfetcher = async (param: any) => {
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
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
      );
      if (TopicContent.file_url) {
        TopicContent.file_full_url =
          (await topicImageUrl) + TopicContent.file_url;
      }
      TopicContent.category = TopicContent.board_name;
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
