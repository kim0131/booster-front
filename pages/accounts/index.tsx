import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { jsx, css, Global, ClassNames } from "@emotion/react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
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
    const member = await axios.post("/api2/login", {
        mbId: username,
        mbPw: password
    }).then((res: any) => {
      const user = res.data.result[0];
      console.log(user)
      signIn("username-password", {
      username :user.mb_id,
      password: user.mb_pw,
      nickname : user.mb_nick,
      redirect: false,
    })
    }).catch(function (error) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      console.log(error.response.data);
      alert(error.response.data.msg)
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }
  });
  };

  return (
    <>
      <Header />
      <form onSubmit={login}>
        <label>
          이메일 :
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
          />
        </label>
        <label>
          비밀번호 :
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
        </label>
        <div className="button_container">
          <button type="submit">로그인</button>
          <Link href="/accounts/signup">
            <button>
              <a>회원가입</a>
            </button>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
