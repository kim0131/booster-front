import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnbLayout from "@components/layouts/snb-layout";
import Snb from "@components/templates/snb";
import Board from "@components/templates/board";

const Search: NextPage = () => {
  const router = useRouter();
  return (
    <SnbLayout>
      {/* <Snb /> */}
      {/* <Board
        category="test"
        // Datas={category == "인기글" ? hotTopic : topicListFilter}
        // onClickRouter={onClickRouter}
      /> */}
    </SnbLayout>
  );
};

export default Search;
