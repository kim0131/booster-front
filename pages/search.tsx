/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";
import { useSearch } from "@core/hook/use-search";
import { useEffect, useState } from "react";

const Search: NextPage = () => {
  const router = useRouter();
  const { searchTerm, category } = router.query;
  const { searchResult } = useSearch(searchTerm, category);

  const onClickRouter = (param: any) => {
    if (param.sector == "topics") {
      router.push(`/${param.sector}/detail?id=${param.idx}`);
    } else {
      router.push(`/${param.sector}/${param.idx}`);
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
          />
          <Board
            category={category ? category : "all"}
            title={"검색결과"}
            datas={searchResult.result}
            onClickRouter={onClickRouter}
          />
        </>
      )}
    </SnbLayout>
  );
};

export default Search;
