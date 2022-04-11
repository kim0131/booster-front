import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";
import { useSearch } from "@core/hook/use-search";
import { useEffect } from "react";

const Search: NextPage = () => {
  const router = useRouter();
  const { searchTerm, category } = router.query;
  const { searchResult } = useSearch(searchTerm);
  useEffect(() => {
    filterList();
  }, [searchResult]);
  const onClickRouter = (param: any) => {
    if (param.sector == "topics") {
      router.push(`/${param.sector}/detail?id=${param.idx}`);
    } else {
      router.push(`/${param.sector}/${param.idx}`);
    }
  };
  const filterList = () => {
    if (searchResult) {
      const result = searchResult.result.filter((data: any) => {
        if (category == "all") {
          return true;
        } else {
          return data.bo_table == category;
        }
      });
      return result;
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
            category="test"
            title={`전체 (${searchResult.result.length})`}
            datas={filterList()}
            onClickRouter={onClickRouter}
          />
        </>
      )}
    </SnbLayout>
  );
};

export default Search;
