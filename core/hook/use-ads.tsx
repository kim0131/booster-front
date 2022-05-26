import { adsImageUrl } from "@core/config/imgurl";
import { IAdsData } from "@core/interfaces/ads";
import axios from "axios";
import _ from "lodash";
import useSWR from "swr";

// interface IAdsDetailFetcher {
//   id: number;
// }

// const adsDetailFetcher = async ({ id }: IAdsDetailFetcher) => {
//   await axios.get(`/api2/home/adbanner/detail/${id}`).then(res => {
//     return res.data.result;
//   });
// };

// export const useAdsDetail = (id: number) => {
//   const { data: adsDetail } = useSWR(
//     { url: `/api2/home/ads/detail`, id: id },
//     adsDetailFetcher,
//   );
//   return { adsDetail };
// };

const adsListFetcher = async () => {
  try {
    const res = await axios.get("/api2/home/adbanner");
    const resData = res.data.result.map(
      (item: {
        idx: IAdsData["id"];
        image_url: IAdsData["imageUrl"];
        posting_date: IAdsData["imageUrl"];
        posting_exitdate: IAdsData["imageUrl"];
        title: IAdsData["title"];
        url: IAdsData["url"];
        priority: IAdsData["priority"];
      }) => {
        return {
          id: item.idx,
          imageUrl: adsImageUrl + item.image_url,
          postingDate: item.posting_date,
          postingExitdate: item.posting_exitdate,
          title: item.title,
          url: item.url,
          priority: item.priority,
        };
      },
    );
    return _.sortBy(resData, "priority");
  } catch (error) {
    alert(`관리자에게 문의하세요 error : ${error}`);
  }
  // let result: any = [];
  // await axios
  //   .get("/api2/home/adbanner")
  //   .then(res => {
  //     console.log(res.data.result);
  //     return res.data.result;
  //     // const homeList = res.data.result;
  //     // homeList.map(
  //     //   (item: {
  //     //     idx: IAdsData["id"];
  //     //     image_url: IAdsData["imageUrl"];
  //     //     posting_date: IAdsData["imageUrl"];
  //     //     posting_exitdate: IAdsData["imageUrl"];
  //     //     title: IAdsData["title"];
  //     //     url: IAdsData["url"];
  //     //     priority: IAdsData["priority"];
  //     //   }) => {
  //     //     result.push({
  //     //       id: item.idx,
  //     //       imageUrl: adsImageUrl + item.image_url,
  //     //       postingDate: item.posting_date,
  //     //       postingExitdate: item.posting_exitdate,
  //     //       title: item.title,
  //     //       url: item.url,
  //     //       priority: item.priority,
  //     //     });
  //     //   },
  //     // );
  //   })
  //   .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  // result = result.sort(function (a: any, b: any) {
  //   return a.priority - b.priority;
  // });
  // return result;
};

interface IUseAdsList {
  data?: IAdsData[];
}

export const useAdsList = () => {
  const { data: adsList }: IUseAdsList = useSWR(
    `/api2/home/ads/list`,
    adsListFetcher,
  );
  return { adsList };
};
