import type { NextPage } from "next";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import moment from "momnet";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IAccountsData } from "@core/interfaces/accounts";
import AccountsLayout from "@components/layouts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import {
  mb_email_vaildate,
  mb_id_vaildate,
  mb_nick_vaildate,
  mb_ph_vaildate,
  mb_pw_vaildate,
} from "@core/validate/signupvalidate";
import { signIn } from "next-auth/react";

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
      mb_business_num: 0,
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
    setState({ ...state, isLoading: true });
    console.log(1);
    console.log(state.isLoading);
    e.preventDefault();
    let pass_fail = true;
    await mb_id_vaildate(state.data.mb_id).then(res => {
      if (res.error) {
        setState({
          ...state,
          invalid: { ...state.invalid, mb_id: res.error },
        });
        pass_fail = false;
      }
    });

    await mb_pw_vaildate(state.data.mb_pw).then(res => {
      if (res.error) {
        setState({ ...state, invalid: { ...state.invalid, mb_pw: res.error } });
        pass_fail = false;
      }
    });

    if (state.data.mb_pw != state.data.mb_pw2) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_pw2: "비밀번호가 일치하지 않습니다." },
      });
      pass_fail = false;
    }

    if (pass_fail) {
      setState({ ...state, page: 2 });
    }
  };

  const onClickConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    let pass_fail = true;
    await mb_nick_vaildate(state.data.mb_nick).then(res => {
      if (res.error) {
        setState({ ...state, invalid: { mb_nick: res.error } });
        pass_fail = false;
      }
    });
    await mb_email_vaildate(state.data.mb_email).then(res => {
      if (res.error) {
        setState({ ...state, invalid: { mb_email: res.error } });
        pass_fail = false;
      }
    });
    await mb_ph_vaildate(state.data.mb_ph).then(res => {
      if (res.error) {
        setState({ ...state, invalid: { mb_ph: res.error } });
        pass_fail = false;
      }
    });
    if (pass_fail == true) {
      await axios
        .post("/api2/signup", {
          mb_id: state.data.mb_id,
          mb_pw: state.data.mb_pw,
          mb_email: state.data.mb_email,
          mb_name: state.data.mb_name,
          mb_ph: state.data.mb_ph,
          mb_pw_token: state.data.mb_pw_token,
          mb_datetime: state.data.mb_datetime,
          mb_business_num: state.data.mb_business_num,
          mb_nick: state.data.mb_nick,
        })
        .then(async (res: any) => {
          const mb_idx = res.data.result.idx;
          await axios
            .post(`/api2/business/write`, {
              mb_idx: mb_idx,
            })
            .then(async res => {
              const business_idx = res.data.result.idx;
              await axios.post(`/api2/user/update/${mb_idx}`, {
                mb_business_num: business_idx,
                mb_business_certify: 0,
              });
            });
          signIn("username-password", {
            mb_id: state.data.mb_id,
            mb_pw: state.data.mb_pw,
            mb_nick: state.data.mb_nick,
            redirect: false,
          });
          router.push("/accounts/business-registration");
        })
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
        });
    }
    setState({ ...state, isLoading: false });
  };

  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    state.page == 1
      ? router.push("/accounts")
      : setState({ ...state, page: 1 });
  };

  return (
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
              type="password"
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
              type="password"
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
  );
};

export default Signup;
