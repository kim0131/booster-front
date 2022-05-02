import InsightsContentLayout from "@components/layouts/insights-content-layout";
import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import { useInsightDetail } from "@core/hook/use-insight-detail";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InsightComment from "@components/templates/insight-comment";

const InsightId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { insightDetail } = useInsightDetail(id);
  const { category, page } = router.query;

  const onClickCategory = (content: any) => {
    if (category == content) {
      router.push(
        `/insights/${id}?category=${content}${page ? `&page=${page}` : ""}`,
      );
    } else {
      router.push(`/insights/${id}?category=${content}`);
    }
  };
  return (
    <>
      {insightDetail && (
        <InsightsContentLayout
          insightDetail={insightDetail}
          id={id}
          comments={id && <InsightComment id={id} />}
        >
          <LnbLayout>
            {/* <Lnb
              param={category ? category : "all"}
              onClick={onClickCategory}
            /> */}
            <Post category={category ? category : "all"} />
          </LnbLayout>
        </InsightsContentLayout>
      )}
    </>
  );
};

export default InsightId;
