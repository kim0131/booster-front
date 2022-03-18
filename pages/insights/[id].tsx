import InsightsContentLayout from "@components/layouts/insights-content-layout";
import LnbLayout from "@components/layouts/lnb-layout";
import Lnb from "@components/templates/lnb";
import Post from "@components/templates/post";
import { useInsightDetail } from "@core/hook/use-insightDetail";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InsightComment from "@components/templates/insight-comment";

const InsightId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { insightDetail } = useInsightDetail(id);

  const [selectCategory, setCategory] = useState<any>();
  const { category } = router.query;
  useEffect(() => {
    setCategory(category);
  }, [category]);

  const onClickCategory = (content: any) => {
    setCategory(content);
  };
  return (
    <>
      {insightDetail && (
        <InsightsContentLayout
          insightDetail={insightDetail}
          id={id}
          comments={<InsightComment id={id} />}
        >
          <LnbLayout>
            <Lnb param={selectCategory} onClick={onClickCategory} />
            <Post category={selectCategory} />
          </LnbLayout>
        </InsightsContentLayout>
      )}
    </>
  );
};

export default InsightId;
