import { insightImageUrl, topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const insightDetailfetcher = async (url: any) => {
  let insightDetail: any = {};
  await axios
    .get(url)
    .then(async res => {
      const insightContent = res.data[0];

      const CurrentTime = new Date();
      const ContentTime = new Date(insightContent.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
      );
      if (insightContent.file_url) {
        insightContent.file_full_url =
          insightImageUrl + insightContent.file_url;
      }
      insightContent.category = insightContent.board_name;
      insightContent.bookmark = await false; //추후필요
      insightContent.create = await elapsedTime;
      insightDetail = insightContent;
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  return insightDetail;
};

export const useInsightDetail = (id: any) => {
  const { data: insightDetail, mutate } = useSWR(
    `/api2/insight/list/${id}`,
    insightDetailfetcher,
  );

  return { insightDetail, mutate };
};
