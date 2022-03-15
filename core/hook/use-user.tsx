/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useSWR from "swr";

const userFetcher = async (url: string) => {
  let result: any = { member: {}, business: {} };
  await axios.get(url).then(async res => {
    const businessNum = res.data.result.mb_business_num;
    await axios.get(`/api2/business/${businessNum}`).then(res => {
      result.business = res.data;
    });

    result.member = res.data.result;
  });
  return result;
};

const useGetUser = (id: any) => {
  const { data: userInfo } = useSWR(`/api2/user/${id}`, userFetcher);

  return { userInfo };
};

export default useGetUser;
