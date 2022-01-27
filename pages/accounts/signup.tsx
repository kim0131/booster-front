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
interface MemberData {
  mbId?: string;
  mbPw?: string;
  mbPw2?: string;
  mbEmail?: string;
  mbName?: string;
  mbNick?: string;
  mbPh?: string;
  mbPwToken?: string;
  mbDateTime?: string;
  mbBusinessNum?: string;
}
interface IStateLoginInvalid {
  account?: string;
  password?: string;
}

const SignUp: NextPage = () => {
  const [signUpForm, setsignUpForm] = useState<MemberData>({
    mbId: "",
    mbPw: "",
    mbPw2: "",
    mbEmail: "",
    mbName: "",
    mbNick: "",
    mbPh: "",
    mbPwToken: "",
    mbDateTime: "",
    mbBusinessNum: "",
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

  const onClickLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const signInfo = await axios.post("/api/signup", {
      data: signUpForm,
    });
    console.log("보냄");
  };

  return (
    <>
      <Header />
      <TextField
        name="mbId"
        placeholder="계정을 입력하세요."
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
      <SolidButton onClick={onClickLoginButton}>회원가입</SolidButton>
      <Footer />
    </>
  );
};

export default SignUp;
