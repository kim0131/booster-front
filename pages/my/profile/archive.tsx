import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import TextField from "@components/elements/text-field";
import { useState } from "react";
import Callout from "@components/elements/callout";
import useGetUser from "@core/hook/use-user";
import { useSession } from "next-auth/react";
import axios from "axios";
import router from "next/router";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    ${props => props.theme.screen.md} {
      max-width: 22.5rem;
    }
  `,
  Number: styled.div`
    list-style-type: decimal;
  `,
  Disc: styled.div`
    margin-left: 1.5rem;
    list-style-type: disc;
  `,
};

const Archive: NextPage = () => {
  const [state, setState] = useState(0);
  const [password, setPassword] = useState();
  const { data: session, status }: any = useSession();
  const { userInfo } = useGetUser(session?.user?.idx);
  const [caption, setCaption] = useState("");

  const onChangeArchive = (e: any) => {
    const { name, value } = e.currentTarget;
    setPassword(value);
  };

  const onClickCheckPassWord = async () => {
    await axios
      .post("/api2/login", {
        mb_id: userInfo.member.mb_id,
        mb_pw: password,
      })
      .then(async res => {
        setState(1);
      })
      .catch(error => {
        setCaption("비밀번호가 일치하지 않습니다.");
      });
  };

  const onClickDeleteUser = async () => {
    alert("탈퇴기능은 만들기는 했으나 아직은 보류!");
    // await axios
    //   .post(`/api2/user/delete/${userInfo.member.idx}`)
    //   .then(res => {})
    //   .catch(error => {
    //     console.log(error);
    //   });
    // await axios
    //   .post(`/api2/business/delete/${userInfo.business.idx}`)
    //   .then(res => {})
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  const onFouseReset = () => {
    setCaption("");
  };
  return (
    <>
      {userInfo && (
        <BasicLayout
          title="회원 탈퇴"
          description={
            state === 0
              ? "개인정보 보호를 위하여 회원님의 비밀번호를 다시 한번 확인합니다."
              : "회원 탈퇴를 신청할 수 있습니다."
          }
          buttons={
            <>
              {state === 0 ? (
                <Button
                  size="large"
                  variants="solid"
                  onClick={onClickCheckPassWord}
                >
                  다음
                </Button>
              ) : (
                <Button
                  size="large"
                  variants="solid"
                  color="danger"
                  onClick={onClickDeleteUser}
                >
                  탈퇴하기
                </Button>
              )}
              <Button size="large" onClick={() => router.back()}>취소</Button>
            </>
          }
        >
          {state === 0 ? (
            <Style.Container>
              <TextField
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={onChangeArchive}
                caption={caption}
                onFocus={onFouseReset}
              />
            </Style.Container>
          ) : (
            <Callout title="회원 탈퇴 확인 사항" size="large" color="danger">
              <Style.Number>
                1. 탈퇴 후 회원님이 작성한 프로필 정보, 계정 정보, 프로젝트
                정보, 댓글 등 모든 내용이 삭제되며, 추후 재가입하더라도 복구되지
                않습니다.
              </Style.Number>
              <Style.Number>
                2. 관련 법령에 따라 아래의 종류에 해당하는 기록이 있는 경우,
                회원 정보 및 관련 기록을 정해진 기간 동안 보관하며, 보관기간
                내에는 동일한 아이디 및 이메일로 재가입이 불가능합니다. 이후
                보관기간이 종료되었을 시 회원 정보 및 관련 기록은 지체 없이
                파기됩니다.
              </Style.Number>
              <Style.Number>
                1. 탈퇴 후 회원님이 작성한 프로필 정보, 계정 정보, 프로젝트
                정보, 댓글 등 모든 내용이 삭제되며, 추후 재가입하더라도 복구되지
                않습니다.
              </Style.Number>
              <Style.Disc>
                a. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
              </Style.Disc>
              <Style.Disc>
                b. 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
              </Style.Disc>
              <Style.Disc>
                c. 대금결제 및 재화 등의 공급에 관한 기록 : 5년
              </Style.Disc>
              <Style.Disc>
                d. 계약 또는 청약철회 등에 관한 기록 : 5년
              </Style.Disc>
              <Style.Disc>e. 표시/광고에 관한 기록 : 6개월</Style.Disc>
              <Style.Number>
                3. 회원 탈퇴 신청이 접수되면, 관리자가 확인 후 탈퇴를 처리할
                예정이며 최대 24시간 이내로 탈퇴 완료 이메일을 드릴 예정입니다.
                (영업일 기준)
              </Style.Number>
            </Callout>
          )}
        </BasicLayout>
      )}
    </>
  );
};

export default Archive;
