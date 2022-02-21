import Badge from "@components/elements/badge";
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

const sampleDatas = [
  {
    id: 0,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 1,
    category: "암호화폐",
    title: "코인 수익률 -50%면 하위 몇%이야...?",
    content: "ㅜㅜㅠ 1200에서 600댔어..",
    writer: "LG유플러스",
    like: 2,
    view: 638,
    comments: 16,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 2,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 3,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 4,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 5,
    category: "우리회사 채용해요",
    title: "민자고속도로(서울고속도로) 산업안전 채용",
    content:
      "https://www.seoulbeltway.co.kr/boardCnts/view.do?m=0106&boardID=1000196&boardSeq=1102137&lev=0",
    writer: "새회사",
    like: 4,
    view: 53,
    comments: 5,
    bookmark: true,
    create: new Date(),
  },
  {
    id: 6,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
  {
    id: 7,
    category: "TV·연예",
    title: "이지현 금쪽이 보는 데",
    content:
      "ㅋㅋㅋㅋㅋㅋ진짜 웃기네 이지현 엄마로서 카리스마 0 사자후도 아니고 약간 20대 초반이 연애할 때 남자한테 찡찡거리는 말투네 자기도 자기가 통제가 안되는듯 이지현이 adhd끼가 있어보이는데? 애들은 이쁜데 안타깝다",
    writer: "한국철도공사",
    like: 12,
    view: 365,
    comments: 64,
    bookmark: false,
    create: new Date(),
  },
];

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

const BoardList = {
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
          -webkit-line-clamp: 2; /* ellipsis line */
          -webkit-box-orient: vertical;

          /* webkit 엔진을 사용하지 않는 브라우저를 위한 속성. */
          /* height = line-height * line = 1.2em * 3 = 3.6em  */
          /* line-height: 1.2em;
	height: 3.6em; */
        `,
      },
      Button: styled.button`
        flex: none;
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
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
};

interface IPropsBoard {}

const Board = ({}: IPropsBoard) => {
  const { isDesktop } = useDesktop();

  return (
    <Container>
      {isDesktop && <Header4>토픽 전체</Header4>}
      <BoardList.Container>
        {sampleDatas.map(data => (
          <BoardList.Item.Container key={data.id}>
            <BoardList.Item.Top.Container>
              <BoardList.Item.Top.Content.Container>
                <BoardList.Item.Top.Content.Badge>
                  <Badge>카테고리</Badge>
                </BoardList.Item.Top.Content.Badge>
                <BoardList.Item.Top.Content.Title>
                  {data.title}
                </BoardList.Item.Top.Content.Title>
                <BoardList.Item.Top.Content.Content>
                  {data.content}
                </BoardList.Item.Top.Content.Content>
              </BoardList.Item.Top.Content.Container>
              <BoardList.Item.Top.Button>
                {data.bookmark ? (
                  <IconBookmarkFill size={20} color={theme.color.blue[600]} />
                ) : (
                  <IconBookmark size={20} color={theme.color.gray[500]} />
                )}
              </BoardList.Item.Top.Button>
            </BoardList.Item.Top.Container>
            <BoardList.Item.Bottom.Container>
              <BoardList.Item.Bottom.Info>
                <BoardList.Item.Bottom.Badge>
                  <IconProfile size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{data.writer}</Body3>
                </BoardList.Item.Bottom.Badge>
                <BoardList.Item.Bottom.Badge>
                  <IconLike size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{data.like}</Body3>
                </BoardList.Item.Bottom.Badge>
                <BoardList.Item.Bottom.Badge>
                  <IconView size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{data.view}</Body3>
                </BoardList.Item.Bottom.Badge>
                <BoardList.Item.Bottom.Badge>
                  <IconComment size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{data.comments}</Body3>
                </BoardList.Item.Bottom.Badge>
              </BoardList.Item.Bottom.Info>
              <Body3 color={theme.color.gray[500]}>3일 전</Body3>
            </BoardList.Item.Bottom.Container>
          </BoardList.Item.Container>
        ))}
      </BoardList.Container>
      <Pagination />
    </Container>
  );
};

export default Board;
