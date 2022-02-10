import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import { Body1, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import Callout from "@components/elements/callout";
import { useRouter } from "next/router";
import { IAccountsData } from "@core/interfaces/accounts";
import { useState } from "react";
import axios from "axios";
interface IStateFindPw {
  data: IAccountsData;
  result: { [key in string]: string };
  invalid: { [key in string]: string };
}
const ResetPassword: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<IStateFindPw>({
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
    result: {
      mb_pw: "",
      message: "",
      date: "",
    },
    invalid: {
      mb_name: "",
      mb_ph: "",
      mb_id: "",
    },
  });
  const onClickCancel = () => {
    router.push("/accounts");
  };
  const onChangeFindPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, data: { ...state.data, [name]: value } });
  };
  const onFocusFindPwd = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setState({
      ...state,
      invalid: {
        ...state.invalid,
        [name]: "",
      },
    });
  };

  const FindPw = async () => {
    let pass_fail = true;
    if (!state.data.mb_ph) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_ph: "휴대폰번호를 입력해주세요" },
      });
      pass_fail = false;
    }

    if (!state.data.mb_name) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_name: "이름을 입력해주세요" },
      });
      pass_fail = false;
    }
    if (!state.data.mb_id) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_id: "아이디를 입력해주세요" },
      });
      pass_fail = false;
    }

    if (pass_fail) {
      const resetPw = Math.random().toString(36).substr(2, 11); // 초기화된 비밀번호
      await axios
        .post("/api2/find-password", {
          mb_name: state.data.mb_name,
          mb_ph: state.data.mb_ph,
          mb_id: state.data.mb_id,
        })
        .then(async res => {
          let mb_id = res.data.result.mb_id;
          let date = "가입일 " + res.data.result.mb_datetime.substr(0, 10);
          await axios
            .post("/api2/reset-password", {
              mb_id: mb_id,
              mb_pw: resetPw,
            })
            .then(res => {
              setState({
                ...state,
                result: {
                  ...state.result,
                  mb_pw: "초기화된 비밀번호 : " + resetPw,
                },
              });
            });
        })
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            setState({
              ...state,
              result: {
                ...state.result,
                mb_id: "",
                date: "",
                message: error.response.data.msg,
              },
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
        });
    }
  };
  return (
    <>
      <Header />
      <AccountsLayout
        title={
          <>
            <Header4>{accountsDescription.resetPassword.title}</Header4>
            <Body1>{accountsDescription.resetPassword.step1}</Body1>
          </>
        }
        section1={
          <>
            <TextField
              name="mb_id"
              placeholder="아이디를 입력하세요"
              size="large"
              error={state.invalid.mb_id}
              onChange={onChangeFindPw}
              onFocus={onFocusFindPwd}
            />
            <TextField
              name="mb_name"
              placeholder="이름 입력하세요"
              size="large"
              error={state.invalid.mb_name}
              onChange={onChangeFindPw}
              onFocus={onFocusFindPwd}
            />
            <TextField
              name="mb_ph"
              placeholder="휴대폰 번호를 입력하세요"
              size="large"
              error={state.invalid.mb_ph}
              onChange={onChangeFindPw}
              onFocus={onFocusFindPwd}
            />
            {state.result.mb_pw || state.result.message ? (
              <Callout
                title={
                  state.result.mb_pw ? state.result.mb_pw : state.result.message
                }
              >
                {state.result.date ? state.result.date : ""}
              </Callout>
            ) : (
              ""
            )}
          </>
        }
        section2={
          <>
            {state.result.mb_pw ? (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={onClickCancel}
              >
                로그인하기
              </Button>
            ) : (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={FindPw}
              >
                다음
              </Button>
            )}

            <Button variants="light" size="large" onClick={onClickCancel}>
              취소
            </Button>
          </>
        }
      />
      <Footer />
    </>
  );
};

export default ResetPassword;
