import axios from "axios";
import useSWR from "swr";

const topicComment = async (url: string) => {
  let result: any = [];
  await axios
    .get(url)
    .then(async res => {
      const CurrentTime = new Date();

      const comment = res.data.result;
      if (comment) {
        for (const item of comment) {
          let ContentTime = new Date(item.wr_datetime);
          ContentTime.setHours(ContentTime.getHours());
          const elapsedTime = Math.ceil(
            (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
          );
          result.push(
            await {
              idx: item.idx,
              wr_is_comment: item.wr_is_comment,
              wr_is_comment2: item.wr_is_comment2,
              wr_content: item.wr_content,
              mb_name: item.mb_name,
              mb_id: item.mb_id,
              wr_view: item.wr_view,
              wr_good: item.wr_good,
              likeCnt: item.likeCnt,
              wr_create: elapsedTime,
              replycount: item.replyCnt,
            },
          );
        }
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return result;
};

const insightComment = async (url: string) => {
  let result: any = [];
  await axios
    .get(url)
    .then(async res => {
      const CurrentTime = new Date();
      const comment = res.data.result;
      if (comment) {
        for (const item of comment) {
          let ContentTime = new Date(item.wr_datetime);
          ContentTime.setHours(ContentTime.getHours());
          const elapsedTime = Math.ceil(
            (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 60),
          );

          result.push(
            await {
              idx: item.idx,
              wr_is_comment: item.wr_is_comment,
              wr_is_comment2: item.wr_is_comment2,
              wr_content: item.wr_content,
              mb_name: item.mb_name,
              wr_view: item.wr_view,
              wr_good: item.wr_good,
              mb_id: item.mb_id,
              likeCnt: item.likeCnt,
              wr_create: elapsedTime,
              replycount: item.replyCnt,
            },
          );
        }
      }
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

  return result;
};

export const useTopicComment = (id: any) => {
  const { data: commentsList, mutate } = useSWR(
    `/api2/topic/comment/${id}`,
    topicComment,
    {
      refreshInterval: 1000,
    },
  );
  return { commentsList, mutate };
};

export const useInsightComment = (id: any) => {
  const { data: commentsList, mutate } = useSWR(
    `/api2/insight/comment/${id}`,
    insightComment,
    {
      refreshInterval: 1000,
    },
  );
  return { commentsList, mutate };
};
