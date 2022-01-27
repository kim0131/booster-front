import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { jsx, css, Global, ClassNames } from "@emotion/react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

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

    const response = await signIn("username-password", {
      username,
      password,
      redirect: false,
    }).then((res: any) => {
      if (res?.error == null) {
        router.push("/");
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
