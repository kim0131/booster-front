import type { NextPage } from "next";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Footer />
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
          LG 에너지솔루션
        </Button>
        <Button
          variants="ghost"
          color="primary"
          size="small"
          isLoading={true}
          onClick={() => console.log("ddd")}
        >
          <IconAdd />
          LG 에너지솔루션
        </Button>
        <Button variants="solid" color="primary" size="large">
          <IconAdd />
          LG 에너지솔루션
        </Button>
        <TextField
          label="dada"
          prefix={<IconAdd />}
          placeholder="test"
          caption="아아하하"
        />
      </div>
    </>
  );
};

export default Home;
