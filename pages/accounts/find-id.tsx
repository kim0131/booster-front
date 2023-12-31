import type { NextPage } from "next";
import { Body1, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import AccountsLayout from "@components/layouts/accounts-layout";
import TextField from "@components/elements/text-field";
import Button from "@components/elements/button";
import Callout from "@components/elements/callout";
import { useState } from "react";
import axios from "axios";
import { IAccountsData } from "@core/interfaces/accounts";
import { useRouter } from "next/router";

interface IStateFindId {
  data: IAccountsData;
  result: { [key in string]: string };
  invalid: { [key in string]: string };
}
const FindId: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<IStateFindId>({
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
      mb_id: "",
      message: "",
      date: "",
    },
    invalid: {
      mb_name: "",
      mb_ph: "",
    },
  });
  const onChangeFindId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, data: { ...state.data, [name]: value } });
  };
  const onFocusFindId = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setState({
      ...state,
      invalid: {
        ...state.invalid,
        [name]: "",
      },
    });
  };
  const onClickFindPw = () => {
    router.push("/accounts/reset-password");
  };
  const onClickSignUp = () => {
    router.push("/accounts/signup");
  };
  const onClickCancel = () => {
    router.push("/accounts");
  };
  const FindId = async () => {
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

    await axios
      .post("/api2/find-id", {
        mb_name: state.data.mb_name,
        mb_ph: state.data.mb_ph,
      })
      .then(res => {
        let mb_id = res.data.result.mb_id;
        let date = "가입일 " + res.data.result.mb_datetime.substr(0, 10);
        setState({
          ...state,
          result: {
            ...state.result,
            mb_id: mb_id,
            date: date,
          },
        });
      })
      .catch(error => {
        setState({
          ...state,
          result: {
            ...state.result,
            mb_id: "아이디가 존재하지 않습니다.",
          },
        });
      });
  };

  const onKeyPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      FindId();
    }
  };
  return (
    <AccountsLayout
      title={
        <>
          <Header4>{accountsDescription.findId.title}</Header4>
          <Body1>{accountsDescription.findId.step1}</Body1>
        </>
      }
      section1={
        <>
          <TextField
            name="mb_name"
            placeholder="이름 입력하세요"
            size="large"
            onChange={onChangeFindId}
            error={state.invalid.mb_name}
            onFocus={onFocusFindId}
            onKeyPress={onKeyPressEnter}
          />
          <TextField
            name="mb_ph"
            placeholder="휴대폰 번호를 입력하세요"
            size="large"
            onChange={onChangeFindId}
            error={state.invalid.mb_ph}
            onFocus={onFocusFindId}
            onKeyPress={onKeyPressEnter}
          />
          {state.result.mb_id || state.result.message ? (
            <Callout
              title={
                state.result.mb_id ? state.result.mb_id : state.result.message
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
          {state.result.mb_id ? (
            state.result.mb_id == "아이디가 존재하지 않습니다." ? (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={onClickSignUp}
              >
                회원가입
              </Button>
            ) : (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={onClickFindPw}
              >
                비밀번호 초기화
              </Button>
            )
          ) : (
            <Button
              variants="solid"
              color="primary"
              size="large"
              onClick={FindId}
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

export default FindId;
