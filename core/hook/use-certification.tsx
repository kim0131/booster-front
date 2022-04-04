import axios from "axios";
import useSWR from "swr";

const sEnDatafetcher = async () => {
  let result: any;
  await axios.get("/api2/checkplus_main").then(res => {
    result = res.data.result.sEncData;
  });

  return result;
};

const useGetsEncData = () => {
  const { data: sEnData } = useSWR("/api2/checkplus_main", sEnDatafetcher);

  return { sEnData };
};
export default useGetsEncData;
