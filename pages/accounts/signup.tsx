import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { jsx, css, Global, ClassNames } from "@emotion/react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import { useState } from "react";
import TextField from "../../component/input/text-field";
import SolidButton from "../../component/buttons/solid-button";
import axios from "axios";
import router from "next/router";
import moment from "momnet";
interface MemberData {
  mbId?: string;
  mbPw?: string;
  mbPw2?: string;
  mbEmail?: string;
  mbName?: string;
  mbNick?: string;
  mbPh?: string;
  mbPwToken?: string;
  mbDateTime?: Date;
  mbBusinessNum?: number;
}

interface IStateLoginInvalid {
  account?: string;
  password?: string;
}

const SignUp: NextPage = () => {
  const [stateNum, setStatenum] = useState(1);
  const nowtime = moment().format("YYYY-MM-DD HH:mm:ss");
  let newDate = new Date(nowtime);
  const [signUpForm, setsignUpForm] = useState<MemberData>({
    mbId: "",
    mbPw: "",
    mbPw2: "",
    mbEmail: "",
    mbName: "",
    mbNick: "",
    mbPh: "",
    mbPwToken: "",
    mbDateTime: newDate,
    mbBusinessNum: 0,
  });

  const [loginInvalid, setLoginInvalid] = useState<IStateLoginInvalid>({
    account: "",
    password: "",
  });

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setsignUpForm({ ...signUpForm, [name]: value });
    console.log(signUpForm);
  };

  const onFocusTextField = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setLoginInvalid({ ...loginInvalid, [name]: "" });
  };

  const onClickLoginButton1 = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (stateNum == 1) {
      if (signUpForm.mbPw != signUpForm.mbPw2) {
        alert("비밀번호가 일치하지 않음");
        return null;
      }
      setStatenum(stateNum + 1);
    }

    if (stateNum == 2) {
      const signInfo = await axios
        .post("/api2/signup", {
          mbId: signUpForm.mbId,
          mbPw: signUpForm.mbPw,
          mbEmail: signUpForm.mbEmail,
          mbName: signUpForm.mbName,
          mbPh: signUpForm.mbPh,
          mbPwToken: signUpForm.mbPwToken,
          mbDateTime: signUpForm.mbDateTime,
          mbBusinessNum: signUpForm.mbBusinessNum,
          mbNick: signUpForm.mbNick,
        })
        .then((res: any) => {})
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            alert(error.response.data.msg);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
        });
    }
    console.log(signUpForm);
  };

  const onClickLoginButton2 = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (stateNum == 1) {
      router.push("/accounts");
    }

    if (stateNum == 2) {
      setStatenum(stateNum - 1);
    }
    console.log(signUpForm);
  };

  return (
    <>
      <Header />
      <section
        css={{
          display: `${stateNum == 1 ? "block" : "none"}`,
        }}
      >
        <TextField
          name="mbId"
          placeholder="아이디을 입력하세요."
          value={signUpForm.mbId}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mbPw"
          placeholder="비밀번호를 입력하세요"
          value={signUpForm.mbPw}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mbPw2"
          placeholder="비밀번호 확인"
          value={signUpForm.mbPw2}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
      </section>
      <section
        css={{
          display: `${stateNum === 2 ? "block" : "none"}`,
        }}
      >
        <TextField
          name="mbNick"
          placeholder="닉네임을 적어주세요"
          value={signUpForm.mbNick}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mbEmail"
          placeholder="이메일을 입력하세요"
          value={signUpForm.mbEmail}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mbName"
          placeholder="이름 입력하세요"
          value={signUpForm.mbName}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mbPh"
          placeholder="휴대폰 번호를 입력하세요"
          value={signUpForm.mbPh}
          invalidMessage={""}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
      </section>
      <SolidButton onClick={onClickLoginButton1}>
        {stateNum == 1 ? "다음" : "완료"}
      </SolidButton>
      <SolidButton onClick={onClickLoginButton2}>
        {stateNum == 2 ? "이전" : "취소"}
      </SolidButton>
      <Footer />
    </>
  );
};

export default SignUp;
