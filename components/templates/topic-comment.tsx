/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Dropdown from "@components/elements/dropdown";
import Pagination from "@components/elements/pagination";
// import Pagination from "@components/elements/pagination";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconComment,
  IconLike,
  IconMoreVertical,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
import { getCreateTime } from "@core/util/get-create-time";
import { useTopicComment } from "@core/hook/use-comment";
import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { LegacyRef, useEffect, useState } from "react";
import { TopicSnbSkeleton } from "@components/layouts/skeleton/topic-skeleton";
import { useDesktop } from "@core/hook/use-desktop";
import { useRef } from "react";
import useToast from "@core/hook/use-toast";
interface IPropsStyle {
  isReply: boolean;
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 3rem;
    box-shadow: ${props => props.theme.shadow.inset.bottom};
  `,
  Comment: styled.div`
    display: flex;
    flex-direction: column;
  `,
  AddComment: {
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
    TextArea: styled.textarea`
      appearance: none;
      padding: 0.625rem;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
      background-color: ${props => props.theme.color.white};
      border-radius: ${props => props.theme.rounded.sm};
      border-width: 1px;
      border-color: ${props => props.theme.color.gray[300]};
    `,
    Button: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    `,
  },
  List: {
    Container: styled.div<IPropsStyle>`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      background-color: ${props =>
        props.isReply ? props.theme.color.gray[100] : props.theme.color.white};
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      padding: ${props =>
        props.isReply ? "1.5rem 1.25rem 1.5rem 2.75rem" : "1.5rem 1.25rem"};
      ${props => props.theme.screen.md} {
        padding: ${props => (props.isReply ? "1.5rem" : "1.5rem 0")};
      }
    `,
    Header: styled.div`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    `,
    Content: styled.div`
      flex: 1 1 0%;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
    `,
    Button: styled.div`
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
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
        &:nth-of-type(2) {
          cursor: pointer;
        }
        &:nth-of-type(3) {
          cursor: pointer;
        }
        &:nth-of-type(4) {
          cursor: pointer;
        }
      `,
    },
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
// Style

interface IPropsContainer {
  size: string;
}

interface IPropsDot {
  size: string;
  color: string;
}

const Container = styled.div<IPropsContainer>`
  display: flex;
  gap: ${props => {
    switch (props.size) {
      case "large":
        return "0.5rem";
      case "small":
        return "0.25rem";
      default:
        return "0.375rem";
    }
  }};
`;

const Dot = styled.div<IPropsDot>`
  width: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
  height: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
  border-radius: ${props => props.theme.rounded.full};
  background-color: ${props => {
    switch (props.color) {
      case "gray":
        return props.theme.color.gray[900];
      case "primary":
        return props.theme.color.blue[600];
      case "success":
        return props.theme.color.green[600];
      case "danger":
        return props.theme.color.red[600];
      case "white":
        return props.theme.color.white;
      default:
        return props.theme.color.white;
    }
  }};
`;

// Component

interface IPropsLoader {
  size?: string;
  color?: string;
}

interface IPropsComment {
  children?: React.ReactNode;
  id?: any;
  count?: number;
}

const TopicComment = ({ id, children, count }: IPropsComment) => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [comments, setComments] = useState<any>();
  const { commentsList } = useTopicComment(id);
  const [totalCount, setTotalCount] = useState(0);
  const [line, setLine] = useState(10);
  const isDesktop = useDesktop();
  const commentContainerRef = useRef<any>();
  const [currentPage, setcurrentPage] = useState(1);
  const toast = useToast();
  const [commentdata, setCommentData] = useState({
    wr_content: "",
    mb_id: session?.user?.email,
    mb_name: session?.user?.name,
    wr_ip: "",
    wr_parent: parseInt(id),
    wr_is_comment: 1,
    board: null,
    replycount: 0,
  });
  const [replydata, setReply] = useState({
    wr_content: "",
    mb_id: session?.user?.email,
    wr_ip: "",
    mb_name: session?.user?.name,
    wr_parent: parseInt(id),
    wr_parent2: 0,
    wr_is_comment2: 1,
    board: null,
  });

  useEffect(() => {
    if (status != "authenticated") {
      toast.setToast({ type: "danger", message: "로그인 후 이용가능합니다." });
      router.push("/");
    }
    getUserSet();
  }, [router]);

  useEffect(() => {
    sliccComment();
  }, [currentPage, commentsList]);

  const sliccComment = () => {
    if (commentsList) {
      setTotalCount(commentsList.length);
      const result = commentsList.slice(
        (currentPage - 1) * line,
        currentPage * line,
      );
      setComments(result);
    }
  };

  const onClickLink = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
  ) => {
    e.preventDefault();
    const idx: any = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;

    if (content == "댓글달기") {
      if (idx == replydata.wr_parent2) {
        setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
      } else {
        setReply({ ...replydata, wr_parent2: parseInt(idx), wr_content: "" });
      }
    }
    if (content == "삭제하기") {
      let result = confirm("정말 삭제하시겠습니까?");
      if (result) {
        await axios
          .post(`/api2/topic/delete/${idx}`)
          .then(res => {
            alert("삭제되었습니다");
          })
          .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
      }
    }
  };
  const onClickLinkButton = async (id: any) => {
    const idx: any = id;
    if (idx == replydata.wr_parent2) {
      setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
    } else {
      setReply({ ...replydata, wr_parent2: parseInt(idx), wr_content: "" });
    }
  };
  const onClickPagenation = (e: any) => {
    const headerHeight: any = document.querySelector("header");
    const value = parseInt(e.currentTarget.textContent);
    setcurrentPage(value);
    window.scrollTo({
      top: commentContainerRef.current.offsetTop - headerHeight.offsetHeight,
      behavior: "smooth",
    });
  };

  const onClickMoveFront = () => {
    setcurrentPage(1);
  };
  const onClickMoveEnd = () => {
    setcurrentPage(Math.ceil(totalCount / line));
  };

  const getUserSet = async () => {
    const res = await axios.get("/json/"); //IP 얻어오는 것
    setCommentData({
      ...commentdata,
      wr_ip: res.data.IPv4,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
      wr_parent: parseInt(id),
    });
    setReply({
      ...replydata,
      wr_ip: res.data.IPv4,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
      wr_parent: parseInt(id),
    });
  };

  const onClickLikeButton = async (id: number, rn: number) => {
    await axios
      .post(`/api2/topic/like/${id}`, {
        member_idx: parseInt(session?.user?.idx),
      })
      .then(async res => {
        const result = res.data.result.length;
        if (result) {
          await axios
            .post(`/api2/topic/like/cancel/${id}`, {
              member_idx: parseInt(session?.user?.idx),
            })
            .then(async () => {
              const result = await comments.map((item: any, idx: any) => {
                if (comments[idx].idx == id) {
                  item.likeCnt = item.likeCnt - 1;
                }
                return item;
              });
              setComments(result);
            });
        } else {
          await axios
            .post(`/api2/topic/like/insert/${id}`, {
              member_idx: parseInt(session?.user?.idx),
            })
            .then(async () => {
              const result = await comments.map((item: any, idx: any) => {
                if (comments[idx].idx == id) {
                  item.likeCnt = item.likeCnt + 1;
                }
                return item;
              });
              setComments(result);
            });
        }
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  };

  const onClickWriteComment = async () => {
    if (commentdata.wr_content.trim()) {
      await axios
        .post(`/api2/topic/write`, commentdata)
        .then(res => {
          toast.setToast({
            type: "success",
            message: "댓글이 등록되었습니다.",
          });

          setCommentData({ ...commentdata, wr_content: "" });
        })
        .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
    } else {
      toast.setToast({ type: "danger", message: "댓글을 입력해주세요." });
    }
  };
  const onClickWriteReply = async () => {
    if (replydata.wr_content.trim()) {
      await axios
        .post(`/api2/topic/write`, replydata)
        .then(res => {
          toast.setToast({
            type: "success",
            message: "댓글이 등록되었습니다.",
          });
          setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
        })
        .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
    } else {
      toast.setToast({ type: "danger", message: "댓글을 입력해주세요." });
    }
  };
  const onChangeTextareaComment = (e: any) => {
    const { name, value } = e.target;
    setCommentData({ ...commentdata, [name]: value });
  };

  const onChangeTextareaReply = (e: any) => {
    const { name, value } = e.target;
    setReply({ ...replydata, wr_content: value });
  };

  const onClickReply = async (e: any, wr_parent: any) => {
    if (wr_parent == replydata.wr_parent2) {
      setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
    } else {
      setReply({
        ...replydata,
        wr_parent2: parseInt(wr_parent),
        wr_content: "",
      });
    }
  };

  const checkMbName = (writer: string, userName: string) => {
    return Boolean(writer == userName);
  };

  return (
    <Style.Container>
      <Style.Comment ref={commentContainerRef}>
        {comments &&
          comments.map((comment: any, rn: number) => {
            return (
              <React.Fragment key={comment.idx}>
                <Style.List.Container
                  isReply={comment.wr_is_comment2 ? true : false}
                >
                  <Style.List.Header>
                    <Style.List.Content>
                      {comment.wr_content}
                    </Style.List.Content>

                    <Style.SubMore>
                      <IconMoreVertical />
                      {checkMbName(
                        comment.mb_id,
                        session?.user?.id as string,
                      ) ? (
                        <Dropdown
                          menu={
                            !comment.wr_is_comment2
                              ? [
                                  {
                                    id: 0,
                                    content: "댓글달기",
                                    url: comment.idx,
                                  },
                                  {
                                    id: 1,
                                    content: "삭제하기",
                                    url: comment.idx,
                                  },
                                ]
                              : [
                                  {
                                    id: 1,
                                    content: "삭제하기",
                                    url: comment.idx,
                                  },
                                ]
                          }
                          onClick={onClickLink}
                          isRight={isDesktop ? true : false}
                        />
                      ) : (
                        <>
                          {!comment.wr_is_comment2 && (
                            <Dropdown
                              menu={[
                                {
                                  id: 0,
                                  content: "댓글달기",
                                  url: comment.idx,
                                },
                              ]}
                              onClick={onClickLink}
                              isRight={isDesktop ? true : false}
                            />
                          )}
                        </>
                      )}
                    </Style.SubMore>
                  </Style.List.Header>
                  <Style.List.Bottom.Container>
                    <Style.List.Bottom.Info>
                      <Style.List.Bottom.Badge>
                        <IconProfile size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.mb_name}
                        </Body3>
                      </Style.List.Bottom.Badge>
                      <Style.List.Bottom.Badge
                        onClick={() => onClickLikeButton(comment.idx, rn)}
                      >
                        <IconLike size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.likeCnt}
                        </Body3>
                      </Style.List.Bottom.Badge>
                      {/* <Style.List.Bottom.Badge>
                        <IconView size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                        {comment.wr_view}
                        </Body3>
                      </Style.List.Bottom.Badge> */}
                      {comment.replycount > 0 && (
                        <Style.List.Bottom.Badge>
                          <IconComment
                            size={16}
                            color={theme.color.gray[500]}
                          />
                          <Body3 color={theme.color.gray[500]}>
                            {comment.replycount}
                          </Body3>
                        </Style.List.Bottom.Badge>
                      )}
                      {comment.wr_is_comment2 ? (
                        ""
                      ) : (
                        <Style.List.Bottom.Badge
                          onClick={() => onClickLinkButton(comment.idx)}
                        >
                          <IconComment
                            size={16}
                            color={theme.color.gray[500]}
                          />
                          <Body3 color={theme.color.gray[500]}>댓글달기</Body3>
                        </Style.List.Bottom.Badge>
                      )}
                    </Style.List.Bottom.Info>
                    <Body3 color={theme.color.gray[500]}>
                      {getCreateTime(comment.wr_create)}
                    </Body3>
                  </Style.List.Bottom.Container>
                </Style.List.Container>

                {replydata.wr_parent2 == comment.idx &&
                !comment.wr_is_comment2 ? (
                  <Style.AddComment.Container>
                    <Style.AddComment.TextArea
                      rows={3}
                      name={"wr_content"}
                      onChange={onChangeTextareaReply}
                      value={replydata.wr_content}
                    />
                    <Style.AddComment.Button>
                      <Button
                        variants="solid"
                        color="primary"
                        onClick={onClickWriteReply}
                      >
                        작성하기
                      </Button>
                      <Button
                        onClick={e => {
                          onClickReply(e, comment.idx);
                        }}
                      >
                        취소
                      </Button>
                    </Style.AddComment.Button>
                  </Style.AddComment.Container>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          })}
        {!commentsList && <TopicSnbSkeleton />}
      </Style.Comment>
      <Pagination
        totalContent={totalCount}
        line={line}
        currentPage={currentPage}
        onClick={onClickPagenation}
        MoveFront={onClickMoveFront}
        MoveEnd={onClickMoveEnd}
      />
      <Style.AddComment.Container>
        <Header5>{commentsList && commentsList.length}개의 댓글</Header5>
        <Style.AddComment.TextArea
          rows={3}
          name={"wr_content"}
          onChange={onChangeTextareaComment}
          value={commentdata.wr_content}
        />
        <Style.AddComment.Button>
          <Button
            variants="solid"
            color="primary"
            onClick={onClickWriteComment}
          >
            작성하기
          </Button>
          {/* <Button>취소</Button> */}
        </Style.AddComment.Button>
      </Style.AddComment.Container>
    </Style.Container>
  );
};

export default TopicComment;
