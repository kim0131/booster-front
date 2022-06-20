/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IAccountsData } from "@core/interfaces/accounts";
import AccountsLayout from "@components/layouts/accounts-layout";
import { Body1, Body2, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
var CryptoJS = require("crypto-js");
import {
  mb_email_vaildate,
  mb_id_vaildate,
  mb_name_vaildate,
  mb_nick_vaildate,
  mb_ph_vaildate,
  mb_pw_vaildate,
} from "@core/validate/signupvalidate";
import { signIn } from "next-auth/react";

interface IStateSignup {
  data: IAccountsData;
  invalid: { [key in string]: string };
  page: number;
}

const Signup: NextPage = () => {
  const router = useRouter();
  const { certification: certification } = router.query;

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
      mb_business_num: "",
    },
    page: 1,
  });

  useEffect(() => {
    if (certification) {
      const str = certification?.toString() as String;
      var result = str.replace(" ", "+");
      console.log(result);
      if (!Boolean(decode(result)[0])) {
        alert("인증되지 않는 정보입니다.");
        // router.push("/accounts");
      }
    }
  }, [router]);

  const decode = (ciphertext: string) => {
    var bytes = CryptoJS.AES.decrypt(
      ciphertext.toString(),
      process.env.CHECK_KEY,
    ).toString(CryptoJS.enc.Utf8);

    let info = bytes.replace(`"`, "").replace(`"`, ``).split(";");

    return info;
  };

  const onChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;

    const str = certification?.toString() as String;
    var result = str.replace(" ", "+");
    let mb_name = decode(result as string)[0];
    let mb_ph = decode(result as string)[1];
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
        mb_ph: mb_ph,
        mb_name: mb_name,
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
    const mb_id = await mb_id_vaildate(state.data.mb_id);
    if (mb_id) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_id: mb_id },
      });
      return;
    }

    const mb_pw = await mb_pw_vaildate(state.data.mb_pw);
    if (mb_pw) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_pw: mb_pw },
      });
      return;
    }

    if (state.data.mb_pw != state.data.mb_pw2) {
      setState({
        ...state,
        invalid: {
          ...state.invalid,
          mb_pw2: "비밀번호가 일치하지 않습니다.",
        },
      });
      return;
    } else {
      setState({ ...state, page: state.page + 1 });
    }
  };

  const onClickConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const mb_nick = await mb_nick_vaildate(state.data.mb_nick);
    if (mb_nick) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_nick: mb_nick },
      });
      return;
    }

    const mb_email = await mb_email_vaildate(state.data.mb_email);
    if (mb_email) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_email: mb_email },
      });
      return;
    }

    const mb_name = await mb_name_vaildate(state.data.mb_name);
    if (mb_name) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_name: mb_name },
      });
      return;
    }

    const mb_ph = await mb_ph_vaildate(state.data.mb_ph);
    if (mb_ph) {
      setState({
        ...state,
        invalid: { ...state.invalid, mb_ph: mb_ph },
      });
      return;
    }
    await axios
      .post("/api2/signup", {
        mb_id: state.data.mb_id,
        mb_pw: state.data.mb_pw,
        mb_email: state.data.mb_email,
        mb_name: state.data.mb_name,
        mb_ph: state.data.mb_ph,
        mb_pw_token: state.data.mb_pw_token,
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
              mb_pw: state.data.mb_pw,
              mb_business_num: business_idx,
              mb_business_certify: 0,
            });
          })
          .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
        signIn("username-password", {
          mb_id: state.data.mb_id,
          mb_pw: state.data.mb_pw,
          mb_nick: state.data.mb_nick,
          redirect: false,

          mb_idx: mb_idx,
        });
        router.push("/accounts/business-registration");
      })
      .catch(error => alert(`관리자에게 문의하세요 error : ${error}`));
  };

  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    state.page == 1
      ? router.push("/accounts")
      : setState({ ...state, page: 1 });
  };

  const onClickCertification = () => {
    axios.get("/api3/checkplus_main").then(res => {
      localStorage.setItem("key", "value");
      const form: HTMLFormElement | null | any =
        document.querySelector("#form_chk");
      window.name = "parent";
      window.open(
        "",
        "popupChk",
        "width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no",
      );
      form.action =
        "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
      form.target = "popupChk";
      // form.target = "test";
      form.EncodeData.value = res.data.result.sEncData;

      //submit! (본인인증 화면으로 전환)
      form.submit();
    });
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
        state.page === 1 &&
        certification && (
          <>
            <Body2>아이디 및 비밀번호 정보</Body2>
            <TextField
              name="mb_id"
              placeholder="아이디를 입력하세요."
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
        )
      }
      section2={
        state.page === 2 && (
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
              readonly={true}
            />
            <TextField
              name="mb_ph"
              placeholder='휴대폰 번호를 입력하세요 ("-" 표시 제외)'
              size="large"
              value={state.data.mb_ph}
              error={state.invalid.mb_ph}
              maxLength={50}
              onChange={onChangeSignup}
              onFocus={onFocusSignup}
              readonly={true}
            />
          </>
        )
      }
      section3={
        <>
          {state.page == 1 ? (
            !certification ? (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={onClickCertification}
              >
                휴대폰 인증
              </Button>
            ) : (
              <Button
                variants="solid"
                color="primary"
                size="large"
                onClick={e => {
                  onClickNext(e);
                }}
              >
                다음
              </Button>
            )
          ) : (
            <Button
              variants="solid"
              color="primary"
              size="large"
              onClick={onClickConfirm}
            >
              완료
            </Button>
          )}

          <Button variants="light" size="large" onClick={onClickCancel}>
            {state.page == 1 ? "취소" : "이전"}
          </Button>
          <form name="form" method="post" id="form_chk">
            <input type="hidden" name="m" value="checkplusService" />

            <input type="hidden" name="EncodeData" value="<%=sEncData%>" />
          </form>
        </>
      }
    />
  );
};

export default Signup;
