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
import { mb_id_vaildate } from "@core/validate/idcheck";

interface MemberData {
  mb_id?: string;
  mb_pw?: string;
  mb_pw2?: string;
  mb_email?: string;
  mb_name?: string;
  mb_nick?: string;
  mb_ph?: string;
  mb_pwtoken?: string;
  mb_datetime?: Date;
  mb_businessnum?: number;
}

interface IStateSignUpInvalid {
  mb_id_msg?: string;
  mb_pw_msg?: string;
  mb_pw2_msg?: string;
  mb_email_msg?: string;
  mb_name_msg?: string;
  mb_nick_msg?: string;
  mb_ph_msg?: string;
  mb_pwtoken_msg?: string;
  mb_datetime_msg?: string;
  mb_businessnum_msg?: string;
}
const Container = styled.header`
  // position: sticky;
  width: 25rem;
  top: 0;
  margin: 0 auto;
`;
const SignUp: NextPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stateNum, setStatenum] = useState(1);
  const [signUpForm, setsignUpForm] = useState<MemberData>({
    mb_id: "",
    mb_pw: "",
    mb_pw2: "",
    mb_email: "",
    mb_name: "",
    mb_nick: "",
    mb_ph: "",
    mb_pwtoken: "",
    mb_datetime: currentDate,
    mb_businessnum: 0,
  });

  const [loginInvalid, setLoginInvalid] = useState<IStateSignUpInvalid>({
    mb_id_msg: "",
    mb_pw_msg: "",
    mb_pw2_msg: "",
    mb_email_msg: "",
    mb_name_msg: "",
    mb_nick_msg: "",
    mb_ph_msg: "",
    mb_pwtoken_msg: "",
    mb_datetime_msg: "",
    mb_businessnum_msg: "",
  });

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setsignUpForm({ ...signUpForm, [name]: value });
    console.log(signUpForm);
  };

  const onFocusTextField = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const err_meg = name + "_msg";
    setLoginInvalid({ ...loginInvalid, [err_meg]: "" });
    console.log(name);
  };

  const onClickLoginButton1 = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (stateNum == 1) {
      mb_id_vaildate(signUpForm.mb_id).then(res => {
        console.log(res.value);
        if (res.error) {
          console.log(res.error);
          setLoginInvalid({ mb_id_msg: res.error });

          return null;
        }
      });

      // console.log(mb_id_validate);
      if (signUpForm.mb_pw != signUpForm.mb_pw2) {
        alert("비밀번호가 일치하지 않음");
        return null;
      }
      // setStatenum(stateNum + 1);
    }

    if (stateNum == 2) {
      const signInfo = await axios
        .post("/api2/signup", {
          mbId: signUpForm.mb_id,
          mb_pw: signUpForm.mb_pw,
          mb_email: signUpForm.mb_email,
          mb_name: signUpForm.mb_name,
          mb_ph: signUpForm.mb_ph,
          mb_pwtoken: signUpForm.mb_pwtoken,
          mb_datetime: signUpForm.mb_datetime,
          mb_businessnum: signUpForm.mb_businessnum,
          mb_nick: signUpForm.mb_nick,
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
      <Container
        css={{
          display: `${stateNum == 1 ? "block" : "none"}`,
        }}
      >
        <TextField
          name="mb_id"
          placeholder="아이디을 입력하세요."
          value={signUpForm.mb_id}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
          error={loginInvalid.mb_id_msg}
        />
        <TextField
          name="mb_pw"
          placeholder="비밀번호를 입력하세요"
          value={signUpForm.mb_pw}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mb_pw2"
          placeholder="비밀번호 확인"
          value={signUpForm.mb_pw2}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
      </Container>
      <Container
        css={{
          display: `${stateNum == 2 ? "block" : "none"}`,
        }}
      >
        <TextField
          name="mb_nick"
          placeholder="닉네임을 적어주세요"
          value={signUpForm.mb_nick}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mb_email"
          placeholder="이메일을 입력하세요"
          value={signUpForm.mb_email}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mb_name"
          placeholder="이름 입력하세요"
          value={signUpForm.mb_name}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
        <TextField
          name="mb_ph"
          placeholder="휴대폰 번호를 입력하세요"
          value={signUpForm.mb_ph}
          maxLength={50}
          onChange={onChangeTextField}
          onFocus={onFocusTextField}
        />
      </Container>
      <Container
        css={{
          display: `flex`,
          justifyContent: "space-around",
        }}
      >
        <Button onClick={onClickLoginButton1}>
          {stateNum == 1 ? "다음" : "완료"}
        </Button>
        <Button onClick={onClickLoginButton2}>
          {stateNum == 2 ? "이전" : "취소"}
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
