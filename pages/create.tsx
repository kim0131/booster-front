import Button from "@components/elements/button";
import Selectbox from "@components/elements/selectbox";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import TextField from "@components/elements/text-field";
import TopicCreateLayout from "@components/layouts/topic-create-layout";
import type { NextPage } from "next";
import { useRef, useState } from "react";

const CreateTopic: NextPage = () => {
  const [state, setState] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeheight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height = `${e.target.scrollHeight}px`;
    console.log(e.currentTarget.scrollHeight);
    setState(e.currentTarget.value);
  };
  return (
    <TopicCreateLayout
      category={<Selectbox />}
      title={<TextField />}
      content={
        <TextAreaTopicContent
          name="text"
          value={state}
          textAreaRef={textAreaRef}
          rows={20}
          onChange={onChangeheight}
          maxLength={2000}
        />
      }
      buttons={
        <>
          <Button variants="solid" size="large">
            등록하기
          </Button>
          <Button size="large">취소</Button>
        </>
      }
    />
  );
};

export default CreateTopic;
