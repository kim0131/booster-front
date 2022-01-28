import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import Link from "next/link";
const Footer: NextPage = () => {
  return (
    <>
      <div
        className="footer_container"
        css={{
          backgroundColor: "lightgrey",
          borderTop: "1px solid black",
        }}
      >
        <div className="menu_container">
          <Link href="/">
            <a>커뮤니티소개</a>
          </Link>
          <Link href="/">
            <a>이용약관</a>
          </Link>
          <Link href="/">
            <a>개인정보처리방침</a>
          </Link>
          <Link href="/">
            <a>도움센터</a>
          </Link>
          <Link href="/">
            <a>채용</a>
          </Link>
        </div>
        <div className="info">
          <div className="info__name">(주)크레타랩스</div>
          <div className="info__address">
            사업자 등록번호 : 816-86-02329 | 대표 : 임수민
          </div>
          <div className="info__address2">
            08511 서울특별시 금천구 디지털로9길 47, 205-비21호(가산동, 한신IT
            타워2차)
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
