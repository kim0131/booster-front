import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import useInsightList from "@core/hook/use-insightList";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Insights: NextPage = () => {
  const router = useRouter();
  const [selectCategory, setCategory] = useState<any>();
  const { category } = router.query;
  useEffect(() => {
    setCategory(category);
  }, [category]);

  const onClickCategory = (content: any) => {
    setCategory(content);
  };
  return (
    <LnbLayout>
      <Lnb param={selectCategory} onClick={onClickCategory} />
      <Post category={selectCategory} />
    </LnbLayout>
  );
};

export default Insights;
