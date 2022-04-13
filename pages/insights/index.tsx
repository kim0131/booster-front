import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Insights: NextPage = () => {
  const router = useRouter();
  const { category, page } = router.query;

  const onClickCategory = (content: any) => {
    if (category == content) {
      router.push(
        `/insights?category=${content}${page ? `&page=${page}` : ""}`,
      );
    } else {
      router.push(`/insights?category=${content}`);
    }
  };
  return (
    <LnbLayout>
      <Lnb param={category ? category : "all"} onClick={onClickCategory} />
      <Post category={category ? category : "all"} />
    </LnbLayout>
  );
};

export default Insights;
