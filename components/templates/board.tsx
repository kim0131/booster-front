/* eslint-disable react-hooks/exhaustive-deps */
import Badge from "@components/elements/badge";
import Loader from "@components/elements/loader";
import Pagination from "@components/elements/pagination";
import { Body3, Header4 } from "@components/elements/types";
import {
  IconBookmark,
  IconBookmarkFill,
  IconComment,
  IconLike,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Style = {
  Container: styled.div`
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 0;
    margin-bottom: 3rem;
    ${props => props.theme.screen.md} {
      margin-bottom: 0;
    }
  `,
  BoardList: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        box-shadow: ${props => props.theme.shadow.inset.both};
      }
      & > *:not(:last-child) {
        box-shadow: ${props => props.theme.shadow.inset.bottom};
      }
    `,
    Item: {
      Container: styled.div`
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 0.75rem;
        padding: 1.5rem 1.25rem;
        ${props => props.theme.screen.md} {
          padding: 1.5rem 0;
        }
      `,
      Top: {
        Container: styled.div`
          display: flex;
          align-items: flex-start;
        `,
        Content: {
          Container: styled.div`
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
            min-width: 0;
            gap: 0.5rem;
          `,
          Badge: styled.div`
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
          `,
          Title: styled.div`
            font-size: ${props => props.theme.fontSize.body1};
            line-height: ${props => props.theme.lineHeight.body1};
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          `,
          Content: styled.div`
            font-size: ${props => props.theme.fontSize.body2};
            line-height: ${props => props.theme.lineHeight.body2};
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          `,
        },
        Button: styled.button`
          flex: none;
          width: 1.5rem;
          height: 1.5rem;
        `,
      },
      Bottom: {
        Container: styled.div`
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        `,
        Info: styled.div`
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        `,
        Badge: styled.div`
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        `,
      },
    },
  },
};

interface IPropsBoard {
  category: string | string[] | undefined;
  Datas: {
    id: number;
    category: string;
    title: string;
    content: string;
    writer: string;
    like: number;
    view: number;
    comments: number;
    bookmark: boolean;
    create: number;
    likeCnt: number;
  }[];
  isLoading?: Boolean;
}

const Board = ({ category, Datas, isLoading }: IPropsBoard) => {
  const { isDesktop } = useDesktop();
  const [datas, setData] = useState(Datas);
  const [isLoading2, setLoading] = useState<any>(isLoading);
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(Datas.length);
  const [line, setLine] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    getReplyDatas();
  }, [currentPage, Datas]);

  useEffect(() => {
    setcurrentPage(1);
  }, [Datas]);
  const onClickRouter = (param: number) => {
    router.push(`/topics/detail?id=${param}`);
  };

  const getReplyDatas = () => {
    setTotalCount(Datas.length);
    const result = Datas.slice((currentPage - 1) * line, currentPage * line);
    setData(result);
    setLoading(false);
  };

  const onClickPagenation = (e: any) => {
    const value = parseInt(e.currentTarget.textContent);
    setcurrentPage(value);
  };

  const onClickMoveFront = () => {
    setcurrentPage(1);
  };
  const onClickMoveEnd = () => {
    setcurrentPage(Math.ceil(totalCount / line));
  };

  return (
    <>
      {isLoading2 ? (
        <Loader color="gray" />
      ) : (
        <Style.Container>
          {isDesktop && <Header4> {category ? category : "전체"}</Header4>}

          <Style.BoardList.Container>
            {!datas.length ? (
              //카테고리 게시글이 없을 경우
              <Style.BoardList.Item.Container>
                <Style.BoardList.Item.Top.Container>
                  <Style.BoardList.Item.Top.Content.Container>
                    <Style.BoardList.Item.Top.Content.Title>
                      작성된 게시글이 없습니다.
                    </Style.BoardList.Item.Top.Content.Title>
                    <Style.BoardList.Item.Top.Content.Content>
                      작성된 게시글이 없습니다.
                    </Style.BoardList.Item.Top.Content.Content>
                  </Style.BoardList.Item.Top.Content.Container>
                  <Style.BoardList.Item.Top.Button></Style.BoardList.Item.Top.Button>
                </Style.BoardList.Item.Top.Container>
                <Style.BoardList.Item.Bottom.Container>
                  <Body3 color={theme.color.gray[500]}></Body3>
                </Style.BoardList.Item.Bottom.Container>
              </Style.BoardList.Item.Container>
            ) : (
              datas.map(data => (
                <Style.BoardList.Item.Container
                  key={data.id}
                  onClick={() => onClickRouter(data.id)}
                >
                  <Style.BoardList.Item.Top.Container>
                    <Style.BoardList.Item.Top.Content.Container>
                      {data.category && (
                        <Style.BoardList.Item.Top.Content.Badge>
                          <Badge>{data.category}</Badge>
                        </Style.BoardList.Item.Top.Content.Badge>
                      )}
                      <Style.BoardList.Item.Top.Content.Title>
                        {data.title}
                      </Style.BoardList.Item.Top.Content.Title>
                      <Style.BoardList.Item.Top.Content.Content>
                        {data.content}
                      </Style.BoardList.Item.Top.Content.Content>
                    </Style.BoardList.Item.Top.Content.Container>
                    <Style.BoardList.Item.Top.Button>
                      {data.bookmark ? (
                        <IconBookmarkFill
                          size={20}
                          color={theme.color.blue[600]}
                        />
                      ) : (
                        <IconBookmark size={20} color={theme.color.gray[500]} />
                      )}
                    </Style.BoardList.Item.Top.Button>
                  </Style.BoardList.Item.Top.Container>
                  <Style.BoardList.Item.Bottom.Container>
                    <Style.BoardList.Item.Bottom.Info>
                      <Style.BoardList.Item.Bottom.Badge>
                        <IconProfile size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {data.writer}
                        </Body3>
                      </Style.BoardList.Item.Bottom.Badge>
                      <Style.BoardList.Item.Bottom.Badge>
                        <IconLike size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {data.likeCnt}
                        </Body3>
                      </Style.BoardList.Item.Bottom.Badge>
                      <Style.BoardList.Item.Bottom.Badge>
                        <IconView size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>{data.view}</Body3>
                      </Style.BoardList.Item.Bottom.Badge>
                      <Style.BoardList.Item.Bottom.Badge>
                        <IconComment size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {data.comments}
                        </Body3>
                      </Style.BoardList.Item.Bottom.Badge>
                    </Style.BoardList.Item.Bottom.Info>
                    <Body3 color={theme.color.gray[500]}>
                      {data.create > 24
                        ? `${Math.ceil(data.create / 24)}일전`
                        : `${data.create}시간전`}
                    </Body3>
                  </Style.BoardList.Item.Bottom.Container>
                </Style.BoardList.Item.Container>
              ))
            )}
          </Style.BoardList.Container>
          <Pagination
            totalContent={totalCount}
            line={line}
            currentPage={currentPage}
            onClick={onClickPagenation}
            MoveFront={onClickMoveFront}
            MoveEnd={onClickMoveEnd}
          />
        </Style.Container>
      )}
    </>
  );
};

export default Board;
