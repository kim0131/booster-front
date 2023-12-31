/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";
import { useSearch } from "@core/hook/use-search";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { TopicSnbSkeleton } from "@components/layouts/skeleton/topic-skeleton";
import Loader from "@components/elements/loader";
import useHistoryState from "@core/hook/use-history-state";
import useToast from "@core/hook/use-toast";

const Search: NextPage = () => {
  const router = useRouter();
  const urlCategory = router.query.category;
  const { searchTerm } = router.query;
  const { status } = useSession();
  const [category, setCategory] = useHistoryState("all", "category");
  const { searchResult } = useSearch(searchTerm, category);
  const toast = useToast();

  const onClickRouter = (param: any) => {
    const urlCategory = param.bo_table;

    if (status != "authenticated") {
      toast.setToast({ type: "danger", message: "로그인이 필요합니다." });
    } else {
      if (param.sector == "topics") {
        router.push(
          `/${param.sector}/detail/${param.idx}/?category=${urlCategory}`,
        );
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
