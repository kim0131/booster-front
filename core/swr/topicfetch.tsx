import { topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
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

export const topicfetcher = async (url: string) => {
  onClickCategoryList();
  let topicList: any = [];
  const CurrentTime = new Date();
  await axios.get(url).then(async res => {
    const topic = res.data.result;
    for (const content of topic) {
      const ContentTime = new Date(content.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      topicList.push({
        id: content.idx,
        category: getCategoryName(content.board),
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
  return topicList;
};

export const topicDetail = async (url: any) => {
  let topicList: any = {};
  await axios.get(url).then(async res => {
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
    TopicContent.bookmark = await false; //추후필요
    TopicContent.create = await elapsedTime;
    topicList = TopicContent;
  });
  return topicList;
};

const getCommentIsReply = async (idx: string | number) => {
  const reply = await axios.get(`/api2/topic/reply/${idx}`);
  if (reply.data.result.length) {
    const result: any = [];
    reply.data.result.map((item: any, idx: any) => {
      result.push({
        idx: item.idx,
        wr_is_comment: item.wr_is_comment,
        wr_is_comment2: item.wr_is_comment2,
        wr_content: item.wr_content,
        mb_name: item.mb_name,
        wr_view: item.wr_view,
        wr_good: item.wr_good,
      });
    });
    return result;
  } else {
    return [];
  }
};
export const topicComment = async (url: string) => {
  let result: any = [];
  await axios.get(url).then(async res => {
    const comment = res.data.result;
    for (const item of comment) {
      const CurrentTime = new Date();
      const ContentTime = new Date(item.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      const replyCount = await axios.get(`/api2/topic/replycount/${item.idx}`);

      result.push(
        await {
          idx: item.idx,
          wr_is_comment: item.wr_is_comment,
          wr_is_comment2: item.wr_is_comment2,
          wr_content: item.wr_content,
          mb_name: item.mb_name,
          wr_view: item.wr_view,
          wr_good: item.wr_good,
          wr_create: elapsedTime,
          replycount: replyCount.data.result.length,
          wr_reply: await getCommentIsReply(item.idx),
        },
      );
    }
  });
  return result;
};
