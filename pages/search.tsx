/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";
import { useSearch } from "@core/hook/use-search";
import { useEffect, useState } from "react";
import { checkAuth } from "@core/util/check-auth";
import { useSession } from "next-auth/react";
import { TopicSnbSkeleton } from "@components/layouts/skeleton/topic-skeleton";
import Loader from "@components/elements/loader";
import useHistoryState from "@core/hook/use-history-state";

const Search: NextPage = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const { status } = useSession();
  const [category, setCategory] = useHistoryState("all", "category");
  const { searchResult } = useSearch(searchTerm, category);

  const onClickRouter = (param: any) => {
    if (status != "authenticated") {
      if (checkAuth()) {
        return router.push("/accounts");
      }
    } else {
      if (param.sector == "topics") {
        router.push(`/${param.sector}/detail?id=${param.idx}`);
      } else {
        router.push(`/${param.sector}/${param.idx}`);
      }
    }
  };

  return (
    <SnbLayout>
      {searchResult && (
        <>
          <Snb
            category={category ? category : "all"}
            snbDatas={searchResult.SearchSnbDatas}
            searchTerm={searchTerm}
            setCategory={setCategory}
          />
          <Board
            category={category ? category : "all"}
            title={"검색결과"}
            datas={searchResult.result}
            onClickRouter={onClickRouter}
          />
        </>
      )}
      {!searchResult && (
        <>
          <TopicSnbSkeleton />
          <Loader />
        </>
      )}
    </SnbLayout>
  );
};

export default Search;
