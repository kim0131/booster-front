import axios from "axios";
import useSWR from "swr";
import useTopicList from "./use-topicList";

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

const hotTopicFetcher = async () => {
  await onClickCategoryList();
  let result: any = [];
  const CurrentTime = new Date();
  await axios.get("/api2/topic/list").then(async res => {
    const topic = res.data.result;
    topic.map(async (content: any, idx: any) => {
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
        category: await getCategoryName(content.board),
        title: content.wr_subject,
        content: content.wr_content,
        writer: content.mb_name,
        view: content.wr_view,
        comments: content.commentCnt,
        board: content.board,
        bookmark: false, //추후필요
        create: elapsedTime,
        likeCnt: content.likeCnt,
        hotPoint: hotPoint,
      });
    });
  });
  result = result.sort(function (a: any, b: any) {
    return b.hotPoint - a.hotPoint;
  });
  return result.slice(0, 10);
};

const useHotTopic = () => {
  const { data: hotTopic } = useSWR("/api2/topic/hot", hotTopicFetcher);

  return { hotTopic };
};

export default useHotTopic;
