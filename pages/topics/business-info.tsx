import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { jsx, css, Global, ClassNames } from "@emotion/react";
import { useRouter } from "next/router";
import Header from "../../components/templates/header";
import Footer from "../../components/templates/footer";

const BusinessInfo: NextPage = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default BusinessInfo;
