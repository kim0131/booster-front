import type { NextPage } from "next";
import { Body1, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import AccountsLayout from "@components/layouts/accounts-layout";
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
    if (!state.data.mb_id)
      return setState({
        ...state,
        invalid: { ...state.invalid, mb_id: "아이디를 입력해주세요" },
      });
    if (!state.data.mb_name)
      return setState({
        ...state,
        invalid: { ...state.invalid, mb_name: "이름을 입력해주세요" },
      });
    if (!state.data.mb_ph)
      return setState({
        ...state,
        invalid: { ...state.invalid, mb_ph: "휴대폰번호를 입력해주세요" },
      });

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
          })
          .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
      })
      .catch(function (error) {
        setState({
          ...state,
          result: {
            ...state.result,
            mb_id: "",
            date: "",
            message: error.response.data.msg,
          },
        });
      });
  };

  const onKeyPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      FindPw();
    }
  };
  return (
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
            onKeyPress={onKeyPressEnter}
          />
          <TextField
            name="mb_name"
            placeholder="이름 입력하세요"
            size="large"
            error={state.invalid.mb_name}
            onChange={onChangeFindPw}
            onFocus={onFocusFindPwd}
            onKeyPress={onKeyPressEnter}
          />
          <TextField
            name="mb_ph"
            placeholder="휴대폰 번호를 입력하세요"
            size="large"
            error={state.invalid.mb_ph}
            onChange={onChangeFindPw}
            onFocus={onFocusFindPwd}
            onKeyPress={onKeyPressEnter}
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
  );
};

export default ResetPassword;
