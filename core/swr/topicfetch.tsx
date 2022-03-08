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

export const Topicfetcher = async (url: string) => {
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

        bookmark: false, //추후필요
        create: elapsedTime,
      });
    }
  });
  return topicList;
};

export const TopicDetail = async (url: any) => {
  let topicList: any = {};
  await axios.get(url).then(res => {
    const TopicContent = res.data.result;
    const CurrentTime = new Date();
    const ContentTime = new Date(TopicContent.wr_datetime);
    const elapsedTime = Math.ceil(
      (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
    );
    if (TopicContent.file_url) {
      TopicContent.file_url =
        topicImageUrl + TopicContent.file_url.slice(2, -2);
    }
    console.log(TopicContent);
    TopicContent.category = getCategoryName(TopicContent.board);
    TopicContent.bookmark = false; //추후필요
    TopicContent.create = elapsedTime;
    topicList = TopicContent;
  });
  return topicList;
};
