import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";

const Home: NextPage = () => {
  const toast = useToast();
  return (
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
        dpsjw
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
  );
};

export default Home;
