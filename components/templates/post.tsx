/* eslint-disable react-hooks/exhaustive-deps */
import Badge from "@components/elements/badge";
import Loader from "@components/elements/loader";
import Pagination from "@components/elements/pagination";
import { Body3 } from "@components/elements/types";
import theme from "@components/styles/theme";
import { getCreateTime } from "@core/util/get-create-time";
import { useDesktop } from "@core/hook/use-desktop";
import useInsightList from "@core/hook/use-insight-list";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { checkAuth } from "@core/util/check-auth";
import { useSession } from "next-auth/react";

interface IPropsStyle {
  thumbnail: {
    photo?: string;
  };
  setLine?: any;
}

const Style = {
  Container: styled.div<IPropsStyle["setLine"]>`
    display: grid;
    gap: 1.5rem;
    min-width: 50rem;
    column-gap: 1.5rem;
    row-gap: 3rem;
    padding: 1.5rem 1.25rem;
    ${props => props.theme.screen.xs} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    ${props => props.theme.screen.sm} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    ${props => props.theme.screen.md} {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 0;
    }
    ${props => props.theme.screen.lg} {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  `,
  PostItem: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,
    Thumbnail: styled.div<IPropsStyle["thumbnail"]>`
      aspect-ratio: 4 / 3;
      background-image: ${props =>
        props.photo ? `url(${props.photo})` : "none"};
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: ${props => props.theme.rounded.lg};
    `,
    Badge: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    `,
    Title: styled.div`
      flex: 1 1 0%;
      font-size: ${props => props.theme.fontSize.body1};
      line-height: ${props => props.theme.lineHeight.body1};
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `,
  },
  Pagination: styled.div`
    display: flex;
    justify-content: center;
    ${props => props.theme.screen.xs} {
      grid-column: span 1 / span 1;
    }
    ${props => props.theme.screen.sm} {
      grid-column: span 2 / span 2;
    }
    ${props => props.theme.screen.md} {
      grid-column: span 3 / span 3;
    }
    ${props => props.theme.screen.lg} {
      grid-column: span 4 / span 4;
    }
  `,
};

interface IPropsPost {
  category?: any;
}

const Post = ({ category }: IPropsPost) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();
  const { insightList } = useInsightList(category);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [line, setLine] = useState(8);
  const { id } = router.query;
  const page = router.query.page ? parseInt(router.query.page as string) : 1;
  const { status } = useSession();
  const insightListoffset = useRef<any>();

  useEffect(() => {
    console.log(insightList);
    if (insightList) {
      sliceTopicList();
      setTotalCount(insightList.length);
    }
  }, [router, insightList]);

  useEffect(() => {
    if (insightList) {
      window.scrollTo(
        0,
        insightListoffset.current.offsetTop + 56
          ? insightListoffset.current.offsetTop
          : 0,
      );
    }
  }, [page, category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const sliceTopicList = () => {
    const result = insightList.slice((page - 1) * line, page * line);
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
    if (router.pathname == "/insights/[id]") {
      return `/insights/${id}?category=${category}&page=${page}`;
    } else if (router.pathname == "/insights") {
      return `/insights?category=${category}&page=${page}`;
    }
  };
  const onClickRouterMove = (id: any) => {
    if (status != "authenticated") {
      if (checkAuth()) {
        return router.push("/accounts");
      }
    } else {
      router.push(`/insights/${id}`);
    }
  };
  return (
    <>
      {!insightList ? (
        <Loader color="gray" />
      ) : (
        <Style.Container setLine={setLine} ref={insightListoffset}>
          {insightList &&
            data.map((content: any) => {
              return (
                <React.Fragment key={content.idx}>
                  <Style.PostItem.Container
                    onClick={() => onClickRouterMove(content.idx)}
                  >
                    <Style.PostItem.Thumbnail photo={content.file_full_url} />
                    <Style.PostItem.Badge>
                      <Badge>{content.category}</Badge>
                    </Style.PostItem.Badge>
                    <Style.PostItem.Title>
                      {content.wr_subject}
                    </Style.PostItem.Title>
                    <Body3 color={theme.color.gray[500]}>
                      {getCreateTime(content.create)}
                    </Body3>
                  </Style.PostItem.Container>
                </React.Fragment>
              );
            })}

          <Style.Pagination>
            <Pagination
              totalContent={totalCount}
              line={line}
              currentPage={page}
              onClick={onClickPagenation}
              MoveFront={onClickMoveFront}
              MoveEnd={onClickMoveEnd}
            />
          </Style.Pagination>
        </Style.Container>
      )}
    </>
  );
};

export default Post;
