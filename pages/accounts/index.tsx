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
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username, password);
    const member = await axios
      .post("/api2/login", {
        mbId: username,
        mbPw: password,
      })
      .then((res: any) => {
        const user = res.data.result[0];
        console.log(user);
        signIn("username-password", {
          username: user.mb_id,
          password: user.mb_pw,
          nickname: user.mb_nick,
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
      <form onSubmit={login}>
        <TextField
          label="아이디"
          placeholder="아이디를 입력하세요"
          caption="아이디 틀림"
          name="username"
          type="text"
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          caption="비밀번호 틀림"
          name="password"
          type="password"
        />
        <Button variants="solid" color="primary" size="large">
          로그인
        </Button>
        <Link href="/accounts/signup">
          <Button variants="solid" color="primary" size="large">
            <a>회원가입</a>
          </Button>
        </Link>
      </form>
      <Footer />
    </>
  );
};

export default Login;
