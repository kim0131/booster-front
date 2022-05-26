import useSWR from "swr";

// HOW_TO_USE
// type     :   토스트 유형
// message  :   토스트 메시지

// TOAST_TYPE
//
// info     :   일반 정보
// danger   :   오류
// success  :   성공

const TOAST_TIME = 5000;

interface IToastDatas {
  type: string;
  message: string;
}

let toastDatas: IToastDatas[] = [];
const useToast = () => {
  const { data: toast, mutate: setToast } = useSWR("toast", () => {
    return toastDatas;
  });

  return {
    toast,
    setToast: (updateData: IToastDatas) => {
      toastDatas = [...toastDatas, updateData];
      setToast();
      setTimeout(() => {
        toastDatas = toastDatas.filter(toast => toast !== updateData);
        setToast();
      }, TOAST_TIME);
    },
  };
};

export default useToast;
