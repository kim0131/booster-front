import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import Button from "@components/elements/button";

import styled from "@emotion/styled";
const Container = styled.header`
  // position: sticky;
  width: 25rem;
  top: 0;
  margin: 0 auto;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Login: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }
  const login = async (e: any) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const mb_id = e.target.mb_id.value;
    const mb_pw = e.target.mb_pw.value;
    console.log(mb_id, mb_pw);
    const member = await axios
      .post("/api2/login", {
        mb_id: mb_id,
        mb_pw: mb_pw,
      })
      .then((res: any) => {
        const user = res.data.result[0];
        console.log(user);
        signIn("username-password", {
          mb_id: user.mb_id,
          mb_pw: user.mb_pw,
          mb_nick: user.mb_nick,
          redirect: false,
        });
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          // console.log(error.response.data);
          alert(error.response.data.msg);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={login}>
          <TextField
            label="아이디"
            placeholder="아이디를 입력하세요"
            error="아이디 틀림"
            name="mb_id"
            type="text"
          />
          <TextField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            error="비밀번호 틀림"
            name="mb_pw"
            type="password"
          />
          <ButtonBox>
            <Button variants="solid" color="primary" size="large">
              로그인
            </Button>
            <Button variants="solid" color="primary" size="large">
              <Link href="/accounts/signup">
                <a>회원가입</a>
              </Link>
            </Button>
          </ButtonBox>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
