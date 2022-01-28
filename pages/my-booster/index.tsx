import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import Header from "../../component/header";
import Footer from "../../component/footer";
const MyBooster: NextPage = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default MyBooster;
