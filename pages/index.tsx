import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import Callout from "@components/elements/callout";

const Home: NextPage = () => {
  const toast = useToast();
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "1rem",
        }}
      >
        <Button isDisabled>
          <IconAdd />
          {toast.message}
        </Button>
        <Button
          variants="ghost"
          color="primary"
          size="small"
          isLoading={true}
          onClick={() => console.log("ddd")}
        >
          <IconAdd />
          ㅠㅠ
        </Button>
        <Button
          variants="solid"
          color="primary"
          size="large"
          onClick={() => {
            toast.mutate("성공");
          }}
        >
          <IconAdd />
          ㅠㅠ
        </Button>
        <TextField
          label="dada"
          prefix={<IconAdd />}
          size="large"
          placeholder="test"
          error="아아하하"
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
