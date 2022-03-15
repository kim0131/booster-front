import Badge from "@components/elements/badge";
import Loader from "@components/elements/loader";
import Pagination from "@components/elements/pagination";
import { Body3 } from "@components/elements/types";
import theme from "@components/styles/theme";
import useDesktop from "@core/hook/use-desktop";
import useInsightList from "@core/hook/use-insightList";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

interface IPropsStyle {
  thumbnail: {
    photo?: string;
  };
}

const Style = {
  Container: styled.div`
    display: grid;
    gap: 1.5rem;
    min-width: 0;
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
  isLoading?: Boolean;
  category?: any;
}

const Post = ({ isLoading, category }: IPropsPost) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();
  const { insightList } = useInsightList();
  const onClickRouterMove = (id: any) => {
    router.push(`/insights/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <Loader color="gray" />
      ) : (
        <Style.Container>
          {insightList &&
            insightList.map((content: any) => {
              if (category) {
                if (category == content.category) {
                  return (
                    <React.Fragment key={content.idx}>
                      <Style.PostItem.Container
                        onClick={() => onClickRouterMove(content.idx)}
                      >
                        <Style.PostItem.Thumbnail
                          photo={content.file_full_url}
                        />
                        <Style.PostItem.Badge>
                          <Badge>{content.category}</Badge>
                        </Style.PostItem.Badge>
                        <Style.PostItem.Title>
                          {content.wr_subject}
                        </Style.PostItem.Title>
                        <Body3 color={theme.color.gray[500]}>
                          {content.create > 24
                            ? `${Math.ceil(content.create / 24)}일전`
                            : `${content.create}시간전`}
                        </Body3>
                      </Style.PostItem.Container>
                    </React.Fragment>
                  );
                }
              } else {
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
                        {content.create > 24
                          ? `${Math.ceil(content.create / 24)}일전`
                          : `${content.create}시간전`}
                      </Body3>
                    </Style.PostItem.Container>
                  </React.Fragment>
                );
              }
            })}

          <Style.Pagination>
            <Pagination totalContent={0} line={0} currentPage={0} />
          </Style.Pagination>
        </Style.Container>
      )}
    </>
  );
};

export default Post;
