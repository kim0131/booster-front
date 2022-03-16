import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import useHotTopic from "@core/hook/use-hottopic";
import React from "react";
import styled from "@emotion/styled";

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Home: NextPage = () => {
  const toast = useToast();
  const { hotTopic } = useHotTopic();
  console.log(hotTopic);
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
      <TextAreaTopicContent />
      {hotTopic && (
        <div className="hoptopic">
          {hotTopic.map((item: any, idx: any) => {
            return (
              <React.Fragment key={item.id}>
                <Flex>
                  <div className="category">카테고리 : {item.category}</div>
                  <div className="title">제목 : {item.title}</div>
                  <div className="like"> 좋아요 : {item.likeCnt}</div>
                  <div className="view">조회수 : {item.view}</div>
                  <div className="comment"> 댓글수 : {item.comments}</div>
                  <div className="comment"> 포인트 : {item.hotPoint}</div>
                </Flex>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
