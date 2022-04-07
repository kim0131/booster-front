import { adsImageUrl, homeImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const mainBannerDetailFetcher = async (proms: any) => {
  let result: any = {};
  await axios.get(`/api2/home/main/detail/${proms.id}`).then(res => {
    result = res.data.result;
  });

  return result;
};

const mainBannerListFetcher = async () => {
  let result: any = [];
  await axios.get("/api2/home/main").then(res => {
    const homeList = res.data.result;
    homeList.map((item: any, idx: number) => {
      result.push({
        id: item.idx,
        image_url: homeImageUrl + item.image_url,
        posting_date: item.posting_date,
        posting_exitdate: item.posting_exitdate,
        title: item.title,
        url: item.url,
        priority: item.priority,
        content: item.subtitle,
        thumbnailColor: item.background_color,
      });
    });
  });
  result = result.sort(function (a: any, b: any) {
    return a.priority - b.priority;
  });
  return result;
};
export const useMainBannerDetail = (id: any) => {
  const { data: MainbannerDetail } = useSWR(
    { url: `/api2/home/ads/detail`, id: id },
    mainBannerDetailFetcher,
  );
  return { MainbannerDetail };
};

const useMainBanner = () => {
  const { data: mainBannerList } = useSWR(
    `/api2/home/main/list`,
    mainBannerListFetcher,
  );
  return { mainBannerList };
};

export default useMainBanner;
