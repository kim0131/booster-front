import type { NextPage } from "next";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import moment from "momnet";
import Button from "@components/elements/button";
import Footer from "@components/templates/footer";
import TextField from "@components/elements/text-field";
import Header from "@components/templates/header";
import { IAccountsData } from "@core/interfaces/accounts";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import { mb_id_vaildate, mb_pw_vaildate } from "@core/validate/signupvalidate";

interface IStateSignup {
  data: IAccountsData;
  invalid: { [key in string]: string };
  page: number;
  isLoading: boolean;
}

const Signup: NextPage = () => {
  const [state, setState] = useState<IStateSignup>({
    data: {
      mb_id: "",
      mb_pw: "",
      mb_pw2: "",
      mb_email: "",
      mb_name: "",
      mb_nick: "",
      mb_ph: "",
      mb_pw_token: "",
      mb_datetime: new Date(),
      mb_business_num: "",
    },
    invalid: {
      mb_id: "",
      mb_pw: "",
      mb_pw2: "",
      mb_email: "",
      mb_name: "",
      mb_nick: "",
      mb_ph: "",
      mb_pw_token: "",
      mb_datetime: "",
      mb_business_num: "",
    },
    page: 1,
    isLoading: false,
  });

  const onChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
      invalid: {
        ...state.invalid,
        [name]: "",
      },
    });
  };

  const onFocusSignup = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setState({
      ...state,
      invalid: {
        ...state.invalid,
        [name]: "",
      },
    });
  };

  const onClickNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mb_id_vaildate(state.data.mb_id).then(res => {
      if (res.error) {
        console.log(res.error);
        setState({ ...state, invalid: { mb_id: res.error } });
        return;
      }
    });

    await mb_pw_vaildate(state.data.mb_pw).then(res => {
      if (res.error) {
        console.log(res.error);
        setState({ ...state, invalid: { mb_pw: res.error } });
        return;
      }
    });
    setState({ ...state, page: 2 });
  };

  const onClickConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const signInfo = await axios
    //     .post("/api2/signup", {
    //       mbId: signUpForm.mb_id,
    //       mb_pw: signUpForm.mb_pw,
    //       mb_email: signUpForm.mb_email,
    //       mb_name: signUpForm.mb_name,
    //       mb_ph: signUpForm.mb_ph,
    //       mb_pwtoken: signUpForm.mb_pwtoken,
    //       mb_datetime: signUpForm.mb_datetime,
    //       mb_businessnum: signUpForm.mb_businessnum,
    //       mb_nick: signUpForm.mb_nick,
    //     })
    //     .then((res: any) => {})
    //     .catch(function (error) {
    //       if (error.response) {
    //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    //         console.log(error.response.data);
    //         alert(error.response.data.msg);
    //       } else if (error.request) {
    //         console.log(error.request);
    //       } else {
    //         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    //         console.log("Error", error.message);
    //       }
    //     });
  };

  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    state.page == 1
      ? router.push("/accounts")
      : setState({ ...state, page: 1 });
  };

  return (
    <>
      <Header />
      <AccountsLayout
        title={
          <>
            <Header4>{accountsDescription.signup.title}</Header4>
            <Body1>{accountsDescription.signup.description}</Body1>
          </>
        }
        section1={
          state.page === 1 ? (
            <>
              <Body2>아이디 및 비밀번호 정보</Body2>
              <TextField
                name="mb_id"
                placeholder="아이디을 입력하세요."
                size="large"
                value={state.data.mb_id}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
                error={state.invalid.mb_id}
              />
              <TextField
                name="mb_pw"
                placeholder="비밀번호를 입력하세요"
                size="large"
                value={state.data.mb_pw}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
                error={state.invalid.mb_pw}
              />
              <TextField
                name="mb_pw2"
                placeholder="비밀번호 확인"
                size="large"
                value={state.data.mb_pw2}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
                error={state.invalid.mb_pw2}
              />
            </>
          ) : (
            <>
              <Body2>회원 정보</Body2>
              <TextField
                name="mb_nick"
                placeholder="닉네임을 적어주세요"
                size="large"
                value={state.data.mb_nick}
                error={state.invalid.mb_nick}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
              />
              <TextField
                name="mb_email"
                placeholder="이메일을 입력하세요"
                size="large"
                value={state.data.mb_email}
                error={state.invalid.mb_email}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
              />
            </>
          )
        }
        section2={
          state.page === 2 && (
            <>
              <Body2>연락처</Body2>
              <TextField
                name="mb_name"
                placeholder="이름 입력하세요"
                size="large"
                value={state.data.mb_name}
                error={state.invalid.mb_name}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
              />
              <TextField
                name="mb_ph"
                placeholder="휴대폰 번호를 입력하세요"
                size="large"
                value={state.data.mb_ph}
                error={state.invalid.mb_ph}
                maxLength={50}
                onChange={onChangeSignup}
                onFocus={onFocusSignup}
              />
            </>
          )
        }
        section3={
          <>
            {state.page == 1 ? (
              <Button
                variants="solid"
                color="primary"
                size="large"
                isLoading={state.isLoading}
                onClick={onClickNext}
              >
                다음
              </Button>
            ) : (
              <Button
                variants="solid"
                color="primary"
                size="large"
                isLoading={state.isLoading}
                onClick={onClickConfirm}
              >
                완료
              </Button>
            )}

            <Button variants="light" size="large" onClick={onClickCancel}>
              {state.page == 1 ? "취소" : "이전"}
            </Button>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default Signup;
