import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import Carousel from "@components/templates/carousel";
import HomeLayout from "@components/layouts/home-layout";
import BestWidget from "@components/templates/best-widget";
import useHotTopic from "@core/hook/use-hottopic";
import React from "react";
import styled from "@emotion/styled";

const sampleDatas = {
  best: [
    {
      id: 0,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 1,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 2,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 3,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 4,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 5,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 6,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 7,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 8,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 9,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
    {
      id: 10,
      category: "게임",
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
      comments: 12,
    },
  ],
  list: [
    {
      id: 0,
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
    },
    {
      id: 1,
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
    },
    {
      id: 2,
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
    },
    {
      id: 3,
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
    },
    {
      id: 4,
      title: "격리중인 공무원 무물 ㅠ",
      view: 1200,
      like: 32,
    },
  ],
};

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Home: NextPage = () => {
  const toast = useToast();
  const { hotTopic } = useHotTopic();

  return (
    <>
      <Carousel />
      <HomeLayout>
        <BestWidget title="인기 토픽" col={2} datas={sampleDatas.best} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        <BestWidget title="자동차" col={1} datas={sampleDatas.list} />
        {/* <BestWidget col={1} /> */}
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
      </HomeLayout>
    </>
  );
};

export default Home;
