import Badge from "@components/elements/badge";
import Button from "@components/elements/button";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconChevronRight,
  IconComment,
  IconLike,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
// import { checkAuth } from "@core/util/check-auth";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface IStyle {
  col: number;
}

const Style = {
  Container: styled.div<IStyle>`
    grid-column: span 1 / span 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background-color: #fff;
    ${props => props.theme.screen.md} {
      grid-column: ${props => `span ${props.col} / span ${props.col}`};
    }
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25rem;
    ${props => props.theme.screen.md} {
      padding: 0;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
    }
  `,
  List: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      ${props => props.theme.screen.md} {
        gap: 0.75rem;
      }
    `,
    Wrapper: styled.div`
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.both};
      & ~ & {
        box-shadow: ${props => props.theme.shadow.inset.bottom};
        ${props => props.theme.screen.md} {
          box-shadow: none;
        }
      }
      ${props => props.theme.screen.md} {
        box-shadow: none;
        flex-direction: row;
        padding: 0;
        align-items: center;
        gap: 0.75rem;
      }
      cursor: pointer;
    `,
    Category: styled.div`
      display: flex;
      flex-wrap: wrap;
      ${props => props.theme.screen.md} {
        flex: none;
        width: 6rem;
      }
    `,
    Title: styled.div`
      flex: 1 1 0%;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
      margin-top: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      &:hover {
        text-decoration: underline;
      }
      ${props => props.theme.screen.md} {
        display: block;
        margin-top: 0;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
    Info: styled.div`
      flex: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.75rem;
      ${props => props.theme.screen.md} {
        margin-top: 0;
      }
    `,
    Badge: styled.div`
      display: inline-flex;
      align-items: center;
      gap: 0.125rem;
    `,
  },
};

interface IPropsBoardWidget {
  col?: number;
  title?: string;
  url?: string;
  isHotTopic?: boolean;
  datas: {
    id: number;
    category?: string;
    title: string;
    view?: number;
    likeCnt?: number;
    comments?: number;
    category_table?: string;
  }[];
}

const BoardWidget = ({
  col = 1,
  url,
  datas,
  title,
  isHotTopic,
}: IPropsBoardWidget) => {
  const router = useRouter();
  const { status } = useSession();
  const onClickRouterCategory = () => {
    router.push(`/topics?category=${url}`);
  };

  const onClickRouterDetail = (id: any) => {
    if (status != "authenticated") {
      router.push(`/topics?category=${url}`);
    } else {
      router.push(`/topics/detail/${id}?category=${url}`);
    }
  };

  const onClickRouterDetail2 = (param: any) => {
    router.push(`/topics?category=${param}`);
  };

  return (
    <Style.Container col={col}>
      <Style.Header>
        <Header5>{title}</Header5>
        <Button
          color="transparent"
          size="small"
          onClick={onClickRouterCategory}
        >
          더 보기
          <IconChevronRight />
        </Button>
      </Style.Header>
      <Style.List.Container>
        {datas.map(data => (
          <Style.List.Wrapper key={data.id}>
            {isHotTopic && (
              <Style.List.Category
                onClick={() => onClickRouterDetail2(data.category_table)}
              >
                <Badge>{data.category}</Badge>
              </Style.List.Category>
            )}
            <Style.List.Title onClick={() => onClickRouterDetail(data.id)}>
              {data.title}
            </Style.List.Title>
            <Style.List.Info>
              <Style.List.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>{data.likeCnt}</Body3>
              </Style.List.Badge>

              <Style.List.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>{data.view}</Body3>
              </Style.List.Badge>
              {isHotTopic && (
                <Style.List.Badge>
                  <IconComment size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{data.comments}</Body3>
                </Style.List.Badge>
              )}
            </Style.List.Info>
          </Style.List.Wrapper>
        ))}
      </Style.List.Container>
    </Style.Container>
  );
};

export default BoardWidget;
