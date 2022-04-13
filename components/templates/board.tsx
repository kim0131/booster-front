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
import { getCreateTime } from "@core/util/get-create-time";
import { useDesktop } from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import { checkAuth } from "@core/util/check-auth";

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
  category?: string | string[] | undefined;
  title: string;
  datas: {
    id: number;
    idx?: number;
    category: string;
    title: string;
    content: string;
    writer: string | null;
    like: number;
    view: number;
    comments: number;
    bookmark: boolean;
    create: number;
    likeCnt: number;
    rn: number;
  }[];

  onClickRouter?: any;
}

const Board = ({ category, title, datas, onClickRouter }: IPropsBoard) => {
  const { isDesktop } = useDesktop();
  const { data: session, status }: any = useSession();
  const [data, setData] = useState(datas);
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(datas.length);
  const [line, setLine] = useState(10);
  const page = router.query.page ? parseInt(router.query.page as string) : 1;
  const { id, searchTerm } = router.query;
  const topicListref = useRef<any>();

  useEffect(() => {
    if (datas) {
      window.scrollTo(
        0,
        topicListref.current.offsetTop ? topicListref.current.offsetTop : 0,
      );
    }
  }, [page, category]);

  useEffect(() => {
    sliceTopicList();
    setTotalCount(datas.length);
  }, [router, datas]);

  const sliceTopicList = () => {
    const result = datas.slice((page - 1) * line, page * line);
    setData(result);
  };

  const onClickPagenation = (e: any) => {
    const value = parseInt(e.currentTarget.textContent);
    router.push(onClickPage(value) as string);
  };

  const onClickMoveFront = () => {
    router.push(onClickPage(1) as string);
  };
  const onClickMoveEnd = () => {
    router.push(onClickPage(Math.ceil(totalCount / line)) as string);
  };

  const onClickPage = (page?: number) => {
    if (router.pathname == "/topics/detail/[id]") {
      return `/topics/detail/${id}?category=${category}&page=${page}`;
    } else if (router.pathname == "/topics") {
      return `/topics?category=${category}&page=${page}`;
    } else if (router.pathname == "/search") {
      return `/search?searchTerm=${searchTerm}&category=${category}&page=${page}`;
    }
  };

  const onClickScrap = async (id: any, bookmark: any) => {
    if (status != "authenticated") {
      if (checkAuth()) {
        return router.push("/accounts");
      }
    } else {
      if (bookmark) {
        await axios.post(`/api2/topic/scrap/cancel/${id}`, {
          member_idx: session?.user?.idx,
          sector: "topic",
        });
      } else {
        await axios.post(`/api2/topic/scrap/insert/${id}`, {
          member_idx: session?.user?.idx,
          sector: "topic",
        });
      }
      const result = await datas.map((item: any, idx: any) => {
        if (datas[idx].idx == id) {
          item.bookmark = Boolean(!bookmark);
        }
        return item;
      });
      setData(result);
    }
  };

  return (
    <>
      <Style.Container ref={topicListref}>
        {isDesktop && <Header4>{title}</Header4>}

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
            data.map(data => (
              <Style.BoardList.Item.Container key={data.id}>
                <Style.BoardList.Item.Top.Container>
                  <Style.BoardList.Item.Top.Content.Container
                    onClick={() => onClickRouter(data)}
                  >
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
                      <div
                        onClick={() => {
                          onClickScrap(data.idx, data.bookmark);
                        }}
                      >
                        <IconBookmarkFill
                          size={20}
                          color={theme.color.blue[600]}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          onClickScrap(data.idx, data.bookmark);
                        }}
                      >
                        <IconBookmark size={20} color={theme.color.gray[500]} />
                      </div>
                    )}
                  </Style.BoardList.Item.Top.Button>
                </Style.BoardList.Item.Top.Container>
                <Style.BoardList.Item.Bottom.Container
                  onClick={() => onClickRouter(data)}
                >
                  <Style.BoardList.Item.Bottom.Info>
                    <Style.BoardList.Item.Bottom.Badge>
                      <IconProfile size={16} color={theme.color.gray[500]} />
                      <Body3 color={theme.color.gray[500]}>{data.writer}</Body3>
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
                    {getCreateTime(data.create)}
                  </Body3>
                </Style.BoardList.Item.Bottom.Container>
              </Style.BoardList.Item.Container>
            ))
          )}
        </Style.BoardList.Container>
        <Pagination
          totalContent={totalCount}
          line={line}
          currentPage={page}
          onClick={onClickPagenation}
          MoveFront={onClickMoveFront}
          MoveEnd={onClickMoveEnd}
        />
      </Style.Container>
    </>
  );
};

export default Board;
