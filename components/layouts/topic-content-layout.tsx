/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Badge from "@components/elements/badge";
import Button from "@components/elements/button";
import Dropdown from "@components/elements/dropdown";
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
import { topicImageUrl } from "@core/config/imgurl";
import { topicDetail } from "@core/swr/topicfetch";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
    ImageContainer: styled.div`
      background-image: ${(props: any) =>
        props.background ? `url(${props.background})` : ""};
      width: 100%;
      height: auto;
      border-radius: 1rem;
      overflow: hidden;
    `,
  },
  SubMore: styled.div`
    height: 3.5rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    box-shadow: none;
    outline: 0;
    & > div {
      display: none;
    }
    &:hover,
    &:focus,
    &:active {
      outline: 0;
      & > div {
        display: block;
      }
    }
  `,
};

interface IPropsTopicContentLayout {
  data?: any;
  children?: React.ReactNode;
  id?: string | string[] | undefined;
}

const TopicContentLayout = ({
  data,
  children,
  id,
}: IPropsTopicContentLayout) => {
  const router = useRouter();
  const topicContent = data;

  const onClickLink = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
  ) => {
    e.preventDefault();
    const idx: any = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;

    if (idx) {
      router.push(`/topics/edit?id=${idx}`);
    }
    if (content == "삭제하기") {
      let result = confirm("정말 삭제하시겠습니까?");
      if (result) {
        await axios
          .post(`/api2.topic/delete/${idx}`)
          .then(res => alert("삭제되었습니다"));
      }
    }
  };
  return (
    <>
      {topicContent && (
        <Style.Container>
          <Style.Header.Container>
            <Style.Header.Badge>
              <Badge size="large">{topicContent.category}</Badge>
            </Style.Header.Badge>
            <Style.Header.Title>{topicContent.wr_subject}</Style.Header.Title>
            <Style.Header.Bottom.Container>
              <Style.Header.Bottom.Info>
                <Style.Header.Bottom.Badge>
                  <IconProfile size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {topicContent.mb_name}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconLike size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {topicContent.wr_good}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconView size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {topicContent.wr_view}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconComment size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {topicContent.commentCnt}
                  </Body3>
                </Style.Header.Bottom.Badge>
              </Style.Header.Bottom.Info>
              <Body3 color={theme.color.gray[500]}>
                {topicContent.create > 24
                  ? `${Math.ceil(topicContent.create / 24)}일전`
                  : `${topicContent.create}시간전`}
              </Body3>
            </Style.Header.Bottom.Container>
          </Style.Header.Container>
          <Style.Body.Container>
            <Style.Body.Content>{topicContent.wr_content}</Style.Body.Content>
            <Style.Body.ImageContainer>
              <img
                src={
                  topicContent.file_full_url != topicImageUrl
                    ? topicContent.file_full_url
                    : ""
                }
                alt=""
              />
            </Style.Body.ImageContainer>
            <Style.Body.Button.Container>
              <Style.Body.Button.Wrapper>
                <Button color="transparent">
                  <IconLike />
                  {topicContent.wr_good}
                </Button>
                <Button color="transparent">
                  <IconComment />
                  {topicContent.commentCnt}
                </Button>
              </Style.Body.Button.Wrapper>
              <Style.Body.Button.Wrapper>
                <Button color="transparent">
                  <IconBookmark />
                  스크랩
                </Button>

                <Style.SubMore>
                  <IconMoreVertical />

                  <Dropdown
                    menu={[
                      {
                        id: 0,
                        content: "수정하기",
                        url: topicContent.idx,
                      },
                      { id: 1, content: "삭제하기", url: topicContent.idx },
                    ]}
                    onClick={onClickLink}
                  />
                </Style.SubMore>
              </Style.Body.Button.Wrapper>
            </Style.Body.Button.Container>
          </Style.Body.Container>
          {children}
        </Style.Container>
      )}
    </>
  );
};

export default TopicContentLayout;
