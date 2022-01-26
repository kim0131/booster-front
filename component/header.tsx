import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import Link from "next/link";
import styled from "@emotion/styled";
const Header: NextPage = () => {
  const header_css = css`
    head_container {
      display: flex;
    }
  `;

  return (
    <>
      <div
        className="head_container"
        css={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "50px",
          backgroundColor: "lightgrey",
          borderBottom: "1px solid black",
        }}
      >
        <div className="logo">
          <Link href="/">
            <a>
              <img src="" alt="로고" />
            </a>
          </Link>
        </div>
        <div
          className="menu_container"
          css={{
            width: "40%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link href="/topics">
            <a>토픽</a>
          </Link>
          <Link href="/insight">
            <a>인사이트</a>
          </Link>
          <Link href="/">
            <a>서비스</a>
          </Link>
          <Link href="/">
            <a>더보기</a>
          </Link>
        </div>
        <div
          className="function_container"
          css={{
            display: "flex",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          <Link href="/">
            <a>검색</a>
          </Link>
          <Link href="/">
            <a>글쓰기</a>
          </Link>
          <Link href="/accounts">
            <a>로그인/회원가입</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
