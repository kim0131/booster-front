/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import { useTopicListFilter } from "@core/hook/use-topic-list";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Board from "@components/templates/board";
import Snb from "@components/templates/snb";
import _ from "lodash";
import { useCategorySubSide } from "@core/hook/use-category-sub-side";
import { TopicSnbSkeleton } from "@components/layouts/skeleton/topic-skeleton";
import { checkAuth } from "@core/util/check-auth";
import { useSession } from "next-auth/react";
import useHistoryState from "@core/hook/use-history-state";

interface IPropsTopics {
  initCategory: string;
}

const Topics: NextPage<IPropsTopics> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const urlCategory = router.query.category;
  const [category, setCategory] = useHistoryState(
    urlCategory ? urlCategory : "all",
    "category",
  );
  const { categorySubSide, isCategorySubSideValidating } =
    useCategorySubSide("topic");
  const { topicListFilter, isTopicListValidating } =
    useTopicListFilter(category);
  const onClickRouter = (param: any) => {
    if (status != "authenticated") {
      if (checkAuth()) {
        return router.push("/accounts");
      }
    } else {
      if (param.sector == "topics") {
        router.push(
          `/${param.sector}/detail/${param.idx}?category=${category}`,
        );
      } else {
        router.push(`/${param.sector}/${param.idx}`);
      }
    }
  };

  return (
    <SnbLayout>
      {categorySubSide && (
        <>
          {topicListFilter && (
            <>
              <Snb
                category={category}
                snbDatas={categorySubSide}
                setCategory={setCategory}
              />
              <Board
                category={category}
                title={
                  _.find(categorySubSide[0].menus, { param: category })
                    ?.content || ""
                }
                datas={topicListFilter}
                onClickRouter={onClickRouter}
              />
            </>
          )}
        </>
      )}
      {!categorySubSide && <TopicSnbSkeleton />}
      {!topicListFilter && <TopicSnbSkeleton />}
    </SnbLayout>
  );
};

export default Topics;

export const getServerSideProps: GetServerSideProps = async context => {
  const initCategory = context.query.category || "";
  return { props: { initCategory } };
};
