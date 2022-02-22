import Badge from "@components/elements/badge";
import Button from "@components/elements/button";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconBookmark,
  IconComment,
  IconLike,
  IconMoreVertical,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
import styled from "@emotion/styled";

const Style = {
  Container: styled.div`
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-bottom: 3rem;
    ${props => props.theme.screen.md} {
      margin-bottom: 0;
    }
  `,
  Header: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        padding: 0;
        padding-bottom: 1.5rem;
      }
    `,
    Badge: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    `,
    Title: styled.div`
      font-size: ${props => props.theme.fontSize.header4};
      line-height: ${props => props.theme.lineHeight.header4};
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* ellipsis line */
      -webkit-box-orient: vertical;
    `,
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
  Body: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        padding: 1.5rem 0;
      }
    `,
    Content: styled.div`
      white-space: pre-line;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
    `,
    Button: {
      Container: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
      `,
      Wrapper: styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      `,
    },
  },
};

interface IPropsTopicContentLayout {
  children?: React.ReactNode;
}

const TopicContentLayout = ({ children }: IPropsTopicContentLayout) => {
  return (
    <Style.Container>
      <Style.Header.Container>
        <Style.Header.Badge>
          <Badge size="large">게임</Badge>
        </Style.Header.Badge>
        <Style.Header.Title>부산신항만 컨테이너 검수작업</Style.Header.Title>
        <Style.Header.Bottom.Container>
          <Style.Header.Bottom.Info>
            <Style.Header.Bottom.Badge>
              <IconProfile size={16} color={theme.color.gray[500]} />
              <Body3 color={theme.color.gray[500]}>물리돌이</Body3>
            </Style.Header.Bottom.Badge>
            <Style.Header.Bottom.Badge>
              <IconLike size={16} color={theme.color.gray[500]} />
              <Body3 color={theme.color.gray[500]}>12</Body3>
            </Style.Header.Bottom.Badge>
            <Style.Header.Bottom.Badge>
              <IconView size={16} color={theme.color.gray[500]} />
              <Body3 color={theme.color.gray[500]}>1,200</Body3>
            </Style.Header.Bottom.Badge>
            <Style.Header.Bottom.Badge>
              <IconComment size={16} color={theme.color.gray[500]} />
              <Body3 color={theme.color.gray[500]}>23</Body3>
            </Style.Header.Bottom.Badge>
          </Style.Header.Bottom.Info>
          <Body3 color={theme.color.gray[500]}>3일 전</Body3>
        </Style.Header.Bottom.Container>
      </Style.Header.Container>
      <Style.Body.Container>
        <Style.Body.Content>
          {`제목 그대로.

난 전역한지 6년 되어가지만,
대전에 있는 교관하고 연락해서 술한잔함.
지금은 계룡대 어디에서 군무원 수행중.

별 이해관계도 없는 사람에게 왜 가나 싶기도 한데,
서툴렀던 육군 소위 당시에 참 많은 힘이 되어주었던 교관이기도 해서
지금도 많이 생각남.

서로 다 나이가 들어간다며 허허 웃었는데,
참 시간 빠르다 싶었음.`}
        </Style.Body.Content>
        <Style.Body.Button.Container>
          <Style.Body.Button.Wrapper>
            <Button color="transparent">
              <IconLike />
              32
            </Button>
            <Button color="transparent">
              <IconComment />
              32
            </Button>
          </Style.Body.Button.Wrapper>
          <Style.Body.Button.Wrapper>
            <Button color="transparent">
              <IconBookmark />
              스크랩
            </Button>
            <Button color="transparent">
              <IconMoreVertical />
            </Button>
          </Style.Body.Button.Wrapper>
        </Style.Body.Button.Container>
      </Style.Body.Container>
      {children}
    </Style.Container>
  );
};

export default TopicContentLayout;