/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import { Body1 } from "@components/elements/types";
import TextField from "@components/elements/text-field";
import { useSession } from "next-auth/react";
import useGetUser from "@core/hook/use-user";
import { useEffect, useState } from "react";
import { string } from "joi";
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
};

interface IData {
  mb_nick: string;
  mb_email: string;
  mb_name: string;
  mb_ph: string;
}

const ChangeProfile: NextPage = () => {
  const { data: session, status }: any = useSession();
  const { userInfo } = useGetUser(session?.user?.idx);
  const [data, setData] = useState<IData>({
    mb_nick: "",
    mb_email: "",
    mb_name: "",
    mb_ph: "",
  });

  useEffect(() => {
    if (userInfo) {
      setData({
        ...data,
        mb_nick: userInfo.member.mb_nick,
        mb_email: userInfo.member.mb_email,
        mb_name: userInfo.member.mb_name,
        mb_ph: userInfo.member.mb_ph,
      });
    }
  }, [userInfo]);

  const onChangeProfiledata = (e: any) => {
    const { value, name } = e.currentTarget;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onClickSubmitProfile = async () => {
    await axios
      .post(`/api2/user/update/${userInfo.member.idx}`, data)
      .then(() => {
        alert("변경되었습니다.");
        router.push(`/my/profile`);
      });
  };
  return (
    <>
      {userInfo && (
        <BasicLayout
          title="내 정보 변경"
          description="내 정보를 변경합니다."
          buttons={
            <>
              <Button
                size="large"
                variants="solid"
                onClick={onClickSubmitProfile}
              >
                완료
              </Button>
              <Button size="large">취소</Button>
            </>
          }
        >
          <Style.Container>
            <Body1 isBold>회원정보</Body1>
            <TextField
              name={"mb_nick"}
              label="닉네임"
              value={data.mb_nick}
              onChange={onChangeProfiledata}
            />
            <TextField
              name={"mb_email"}
              label="이메일 주소"
              value={data.mb_email}
              onChange={onChangeProfiledata}
            />
          </Style.Container>
          <Style.Container>
            <Body1 isBold>연락처</Body1>
            <TextField
              name={"mb_name"}
              label="이름"
              isDisabled
              value={data.mb_name}
              onChange={onChangeProfiledata}
            />
            <TextField
              name={"mb_ph"}
              label="연락처"
              isDisabled
              value={data.mb_ph}
              onChange={onChangeProfiledata}
            />
            <Button>본인명의 인증</Button>
          </Style.Container>
        </BasicLayout>
      )}
    </>
  );
};

export default ChangeProfile;
