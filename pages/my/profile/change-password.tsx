import type { NextPage } from "next";
import styled from "@emotion/styled";
import Button from "@components/elements/button";
import BasicLayout from "@components/layouts/basic-layout";
import { Body1, Body2 } from "@components/elements/types";
import TextField from "@components/elements/text-field";
import { useSession } from "next-auth/react";
import useGetUser from "@core/hook/use-user";
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { mb_pw_vaildate } from "@core/validate/signupvalidate";

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
  alreadyPw: string;
  newPw: string;
  newPw2: string;
  alreadyPw_caption: string;
  newPw_caption: string;
  new2Pw_caption: string;
}

const ChangePassword: NextPage = () => {
  const { data: session, status }: any = useSession();
  const { userInfo } = useGetUser(session?.user?.idx);
  const [data, setData] = useState<IData>({
    alreadyPw: "",
    newPw: "",
    newPw2: "",
    alreadyPw_caption: "",
    newPw_caption: "",
    new2Pw_caption: "",
  });

  const onChangeProfiledata = (e: any) => {
    const { value, name } = e.currentTarget;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onClickSubmitProfile = async () => {
    await axios
      .post("/api2/login", {
        mb_id: userInfo.member.mb_id,
        mb_pw: data.alreadyPw,
      })
      .then(async res => {
        let { value, error } = { value: "", error: "" };
        await mb_pw_vaildate(data.newPw).then(res => {
          value = res.value;
          error = res.error;
        });
        if (!error) {
          if (data.newPw != data.newPw2) {
            setData({
              ...data,
              new2Pw_caption: "비밀번호가 일치하지 않습니다.",
            });
          } else {
            await axios
              .post(`/api2/user/update/${userInfo.member.idx}`, {
                mb_pw: data.newPw,
              })
              .then(res => {
                alert("비밀번호가 수정되었습니다.");
                router.push("/my/profile");
              });
          }
        } else {
          setData({
            ...data,
            newPw_caption: error,
          });
        }
      })
      .catch(error => {
        setData({
          ...data,
          alreadyPw_caption: "비밀번호가 유효하지 않습니다.",
        });
      });
  };

  const onFocusReset = (e: any) => {
    const name = e.currentTarget.name + "_caption";
    setData({ ...data, [name]: "" });
  };
  return (
    <BasicLayout
      title="비밀번호 변경"
      description="새로운 비밀번호로 변경합니다."
      buttons={
        <>
          <Button size="large" variants="solid" onClick={onClickSubmitProfile}>
            완료
          </Button>
          <Button size="large">취소</Button>
        </>
      }
    >
      <Style.Container>
        <Body2>이전 비밀번호</Body2>
        <TextField
          name={"alreadyPw"}
          type="password"
          placeholder="이전 비밀번호를 입력하세요."
          onChange={onChangeProfiledata}
          value={data.alreadyPw}
          caption={data.alreadyPw_caption}
          onFocus={onFocusReset}
        />
      </Style.Container>
      <Style.Container>
        <Body2>새 비밀번호</Body2>
        <TextField
          name={"newPw"}
          type="password"
          placeholder="새 비밀번호를 입력하세요."
          onChange={onChangeProfiledata}
          value={data.newPw}
          caption={data.newPw_caption}
          onFocus={onFocusReset}
        />
        <TextField
          name={"newPw2"}
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요."
          onChange={onChangeProfiledata}
          value={data.newPw2}
          caption={data.new2Pw_caption}
          onFocus={onFocusReset}
        />
      </Style.Container>
    </BasicLayout>
  );
};

export default ChangePassword;
