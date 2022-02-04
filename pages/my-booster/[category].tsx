import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import { useRouter } from "next/router";

const MyCategory: NextPage = () => {
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

export default MyCategory;
