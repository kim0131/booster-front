/* eslint-disable react-hooks/rules-of-hooks */
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const userFetcher = async (url: string) => {
  let result: any = { member: {}, business: {} };
  if (url == `/api2/user/undefined`) return;
  await axios
    .get(url)
    .then(async res => {
      const businessNum = res.data.result.mb_business_num;
      await axios
        .get(`/api2/business/${businessNum}`)
        .then(res => {
          res.data.file_full_url = businessImageUrl + res.data.business_url;
          result.business = res.data;
        })
        .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));

      result.member = res.data.result;
    })
    .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  return result;
};

const useGetUser = (id: any) => {
  const { data: userInfo } = useSWR(`/api2/user/${id}`, userFetcher, {});

  return { userInfo };
};

export default useGetUser;
