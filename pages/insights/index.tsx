import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import useHistoryState from "@core/hook/use-history-state";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Insights: NextPage = () => {
  const router = useRouter();

  const [category, setCategory] = useHistoryState("all", "category");
  useEffect(() => {
    console.log(category);
  }, [category]);
  return (
    <LnbLayout>
      <Lnb param={category ? category : "all"} onClick={setCategory} />
      <Post category={category ? category : "all"} />
    </LnbLayout>
  );
};

export default Insights;
