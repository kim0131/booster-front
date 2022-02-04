import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import { useRouter } from "next/router";
import Header from "../../components/templates/header";
import Footer from "../../components/templates/footer";

const Home: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
  console.log(category);
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
