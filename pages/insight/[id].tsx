import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import { useRouter } from "next/router";
import Header from "../../component/header";
import Footer from "../../component/footer";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
