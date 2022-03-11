import Button from "@components/elements/button";
import Selectbox from "@components/elements/selectbox";
import TextAreaTopicContent from "@components/elements/text-area-topic-content";
import TextField from "@components/elements/text-field";
import TopicCreateLayout from "@components/layouts/topic-create-layout";
import { topicImageUrl } from "@core/config/imgurl";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";
import { topicDetail, topicfetcher } from "@core/swr/topicfetch";
import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const EditTopic: NextPage = () => {
  const [state, setState] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  let { id } = router.query;
  const { data: topicContent } = useSWR(`/api2/topic/list/${id}`, topicDetail);
  const [data, setData] = useState<any>({
    wr_subject: "",
    wr_content: "",
    wr_ip: "",
    mb_id: "",
    mb_name: "",
    board: topicContent ? topicContent.board : 0,
    wr_datetime: new Date(),
    wr_update: new Date(),
  });

  const { data: categoryList } = useSWR(
    `/api2/category/select`,
    CategorySelectfetcher,
  );

  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });

  useEffect(() => {
    getTopiceContent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicContent]);

  const getTopiceContent = async () => {
    if (topicContent) {
      const TopicContent = topicContent;
      TopicContent.category = router.query.category;
      TopicContent.bookmark = false; //추후필요

      setData({
        ...data,
        wr_subject: TopicContent.wr_subject,
        wr_content: TopicContent.wr_content,
        board: TopicContent.board,
        file_url: TopicContent.file_url,
      });
      setImage({
        image_file: "",
        preview_URL: TopicContent.file_full_url,
      });
    }
  };

  const onChangeheight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height = `${e.target.scrollHeight}px`;

    setState(e.currentTarget.value);
    const { value, name } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const onChangeSelcet = (e: any) => {
    const { value } = e.currentTarget;
    setData({ ...data, board: value });
  };

  const hiddenFileInput = React.useRef<any>(null);

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
  };

  const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setData({
      ...data,
      [name]: value,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
    });
  };

  const onLoadFile = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const onClickSubmitTopic = async () => {
    const formData = new FormData();
    if (image.image_file) {
      formData.append("file", image.image_file);
      formData.append("exist_url", data.file_url);
    }
    await axios
      .post(`/api2/topic/update/${id}`, {
        wr_subject: data.wr_subject,
        wr_content: data.wr_content,
        board: data.board,
      })
      .then(async res => {
        await axios.post(`/api2/topic/upload/${id}`, formData);
        alert("토픽이 등록되었습니다");
        router.push(`/topics`);
      });
  };

  return (
    <TopicCreateLayout
      header="수정하기"
      category={
        categoryList && (
          <Selectbox
            options={categoryList}
            placeholder={"카테고리"}
            onChange={onChangeSelcet}
            value={data.board}
          />
        )
      }
      title={
        <TextField
          name={"wr_subject"}
          onChange={onChangeTopic}
          value={data.wr_subject}
        />
      }
      content={
        <TextAreaTopicContent
          name="wr_content"
          value={data.wr_content}
          textAreaRef={textAreaRef}
          rows={20}
          onChange={onChangeheight}
          maxLength={2000}
          insertImage={onClickInput}
          thumbnail={
            image.preview_URL != topicImageUrl ? image.preview_URL : ""
          }
          delImage={deleteImage}
        />
      }
      buttons={
        <>
          <Button variants="solid" size="large" onClick={onClickSubmitTopic}>
            수정하기
          </Button>
          <Button size="large">취소</Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={onLoadFile}
          />
        </>
      }
    />
  );
};

export default EditTopic;
