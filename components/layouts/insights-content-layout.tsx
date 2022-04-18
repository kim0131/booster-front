import Badge from "@components/elements/badge";
import Button from "@components/elements/button";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconBookmark,
  IconBookmarkFill,
  IconComment,
  IconLike,
  IconMoreVertical,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
import { getCreateTime } from "@core/util/get-create-time";
import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface IPropsStyle {
  thumbnail: {
    photo?: string;
  };
}
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
  Thumbnail: styled.div<IPropsStyle["thumbnail"]>`
    height: 16rem;
    background-image: ${props =>
      props.photo ? `url(${props.photo})` : "none"};
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
      min-width: 50rem;
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
  insightDetail?: any;
  id?: any;
}

const InsightsContentLayout = ({
  children,
  insightDetail,
  comments,
  id,
}: IPropsInsightsContentLayout) => {
  const { data: session, status }: any = useSession();
  const [likeCnt, setLikeCnt] = useState(insightDetail.likeCnt);
  const [bookmark, setBookMark] = useState(false);
  useEffect(() => {
    if (insightDetail) {
      setLikeCnt(insightDetail.likeCnt);
      setBookMark(insightDetail.scrap ? true : false);
      console.log(insightDetail);
    }
  }, [insightDetail]);
  const onClickLikeButton = async () => {
    axios
      .post(`/api2/insight/like/${id}`, {
        member_idx: parseInt(session?.user?.idx),
      })
      .then(async res => {
        const result = res.data.result.length;
        if (result) {
          await axios
            .post(`/api2/insight/like/cancel/${id}`, {
              member_idx: parseInt(session?.user?.idx),
            })
            .then(() => {
              setLikeCnt(likeCnt - 1);
            });
        } else {
          await axios
            .post(`/api2/insight/like/insert/${id}`, {
              member_idx: parseInt(session?.user?.idx),
            })
            .then(() => {
              setLikeCnt(likeCnt + 1);
            });
        }
      });
  };
  const onClickScrap = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
    id: any,
    bookmark: any,
  ) => {
    if (bookmark) {
      await axios
        .post(`/api2/insight/scrap/cancel/${id}`, {
          member_idx: session?.user?.idx,
          sector: "insight",
        })
        .then(() => {
          setBookMark(false);
        })
        .catch(error => console.log(error));
    } else {
      await axios
        .post(`/api2/insight/scrap/insert/${id}`, {
          member_idx: session?.user?.idx,
          sector: "insight",
        })
        .then(() => {
          setBookMark(true);
        })
        .catch(error => console.log(error));
    }
  };
  const createMarkup = () => {
    return { __html: insightDetail.wr_content };
  };
  return (
    <Style.Container>
      <Style.Thumbnail photo={insightDetail.file_full_url} />
      <Style.Wrapper>
        <Style.Header.Container>
          <Style.Header.Badge>
            <Badge size="large">{insightDetail.category}</Badge>
          </Style.Header.Badge>
          <Style.Header.Title>{insightDetail.wr_subject}</Style.Header.Title>
          <Style.Header.Bottom.Container>
            <Style.Header.Bottom.Info>
              <Style.Header.Bottom.Badge>
                <IconProfile size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>
                  {insightDetail.mb_nick}
                </Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>{likeCnt}</Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>
                  {insightDetail.wr_view}
                </Body3>
              </Style.Header.Bottom.Badge>
              <Style.Header.Bottom.Badge>
                <IconComment size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>
                  {insightDetail.commentCnt}
                </Body3>
              </Style.Header.Bottom.Badge>
            </Style.Header.Bottom.Info>
            <Body3 color={theme.color.gray[500]}>
              {getCreateTime(insightDetail.create)}
            </Body3>
          </Style.Header.Bottom.Container>
        </Style.Header.Container>
        <Style.Body.Container>
          <Style.Body.Content
            dangerouslySetInnerHTML={createMarkup()}
          ></Style.Body.Content>
          <Style.Body.Button.Container>
            <Style.Body.Button.Wrapper>
              <Button color="transparent" onClick={onClickLikeButton}>
                <IconLike />
                {likeCnt}
              </Button>
              <Button color="transparent">
                <IconComment />
                {insightDetail.commentCnt}
              </Button>
            </Style.Body.Button.Wrapper>
            <Style.Body.Button.Wrapper>
              <Button
                color="transparent"
                onClick={e => {
                  onClickScrap(e, insightDetail.idx, bookmark);
                }}
              >
                {bookmark ? (
                  <div>
                    <IconBookmarkFill size={20} color={theme.color.blue[600]} />
                  </div>
                ) : (
                  <div>
                    <IconBookmark size={20} color={theme.color.gray[500]} />
                  </div>
                )}
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
