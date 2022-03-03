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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    ${props => props.theme.screen.md} {
      max-width: 72rem;
      margin: 0 auto;
      padding: 3rem;
    }
  `,
  Thumbnail: styled.div`
    height: 16rem;
    background-image: url("https://source.unsplash.com/random");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    ${props => props.theme.screen.md} {
      border-radius: ${props => props.theme.rounded.xxl};
    }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.theme.screen.md} {
      max-width: 72rem;
      margin: 0 auto;
    }
  `,
  Header: {
    Container: styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        align-items: center;
        max-width: 50rem;
        padding: 1.5rem 0;
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
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        max-width: 50rem;
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
    ImageContainer: styled.div`
      background-image: ${(props: any) =>
        props.background ? `url(${props.background})` : ""};
      width: 100%;
      height: auto;
      border-radius: 1rem;
      overflow: hidden;
    `,
  },
};

interface IPropsInsightsContentLayout {
  children?: React.ReactNode;
  comments?: React.ReactNode;
}

const InsightsContentLayout = ({
  children,
  comments,
}: IPropsInsightsContentLayout) => {
  return (
    <Style.Container>
      <Style.Thumbnail />
      <Style.Wrapper>
        <Style.Header.Container>
          <Style.Header.Badge>
            <Badge size="large">뉴스</Badge>
          </Style.Header.Badge>
          <Style.Header.Title>
            전) 알리페이 부사장이 알려주는 핀테크 기업에서 사업개발하기
          </Style.Header.Title>
          <Style.Header.Bottom.Container>
            <Style.Header.Bottom.Info>
              <Style.Header.Bottom.Badge>
                <IconProfile size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>ㅁㄴㅇㄹ</Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>1234</Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>1234</Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconComment size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>23</Body3>
              </Style.Header.Bottom.Badge>
            </Style.Header.Bottom.Info>
            <Body3 color={theme.color.gray[500]}>24시간 전</Body3>
          </Style.Header.Bottom.Container>
        </Style.Header.Container>
        <Style.Body.Container>
          <Style.Body.Content>
            폭발적으로 성장하고 있는 핀테크 산업, 그 가운데서도 가장 빠르게
            변화하고 있는 중국, 알리페이에서 QR코드 결제를 처음 만들고 도입한
            (전)알리페이 부사장 권현돈님을 모셨습니다. 핀테크 기업에서의
            사업개발은 무엇이 다른지, 어떤 포인트가 폭발적인 성장과 더불어
            매출과 유저수의 증대를 가져오는지 들어보세요!
          </Style.Body.Content>
          <Style.Body.Button.Container>
            <Style.Body.Button.Wrapper>
              <Button color="transparent">
                <IconLike />
                123
              </Button>
              <Button color="transparent">
                <IconComment />
                23
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
        {comments}
      </Style.Wrapper>
      {children}
    </Style.Container>
  );
};

export default InsightsContentLayout;
